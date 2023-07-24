const hre = require("hardhat");
const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { networkConfig } = require("../harhat-config-helper");
const {sendWethTokensToUser, approveToContract} = require("../scripts/utils");

describe("LotteryAave tests", function() {

    const aDAI_MAINNET_ADDRESS  = networkConfig[hre.network.config.chainId].aDaiToken;
    const aUSDC_MAINNET_ADDRESS = networkConfig[hre.network.config.chainId].aUsdcToken;
    const aWETH_MAINNET_ADDRESS = networkConfig[hre.network.config.chainId].aWethToken;

    const DAI_MAINNET_ADDRESS  = networkConfig[hre.network.config.chainId].daiToken;
    const USDC_MAINNET_ADDRESS = networkConfig[hre.network.config.chainId].usdcToken;
    const WETH_MAINNET_ADDRESS = networkConfig[hre.network.config.chainId].wethToken;

    const LOTTERY_NAME = "AAVE_TEST";
    const DAY = 3600 * 24;

    function getEndDateTimestampInSeconds(daysCount) {
        let date = new Date();
        date.setDate(date.getDate() + daysCount);
        return Math.floor(date.getTime() / 1000);
    }

    async function deployLotteryAaveFixture() {
        const [owner, addr1, addr2] = await hre.ethers.getSigners();

        const LotteryAave = await hre.ethers.getContractFactory("LotteryAave", owner);
        const lotteryAave = await LotteryAave.deploy();
        await lotteryAave.waitForDeployment();

        return {lotteryAave, owner, addr1, addr2};
    }

    async function deployInitializedLotteryAave(minAmountToDeposit, durationInDays) {
        const {lotteryAave, owner, addr1, addr2} = await loadFixture(deployLotteryAaveFixture);
        await lotteryAave.init(
            LOTTERY_NAME,
            WETH_MAINNET_ADDRESS,
            aWETH_MAINNET_ADDRESS,
            minAmountToDeposit,
            durationInDays,
            owner
        );
        return {lotteryAave, owner, addr1, addr2};
    }

    async function deposit(user, amountToDeposit, lotteryAave) {
        const userFunds = hre.ethers.parseEther("100");
        await sendWethTokensToUser(user, userFunds);
        await approveToContract(user, lotteryAave, WETH_MAINNET_ADDRESS, userFunds);
        await lotteryAave.connect(user).deposit(amountToDeposit);
    }


    describe("Deployment and initialization tests", async function() {

        it("Should deploy", async function() {
            const {lotteryAave} = await loadFixture(deployLotteryAaveFixture);
            const address = await lotteryAave.getAddress();
            expect(address.startsWith("0x"));
        });

        it("Should initialize", async function() {
            const amount = hre.ethers.parseEther("0.001");
            const daysCount = 15;
            const expectedEndDate = getEndDateTimestampInSeconds(daysCount);

            const {lotteryAave} = await deployInitializedLotteryAave(amount, daysCount);

            const name = await lotteryAave.getName();
            const tokenAddress = await lotteryAave.getTokenAddress();
            const minAmountToDeposit = await lotteryAave.getMinAmountToDeposit();
            const endDate = await lotteryAave.getEndDate();
            const timeDiff = Math.abs(Number(endDate) - expectedEndDate);

            expect(name).to.equals(LOTTERY_NAME);
            expect(tokenAddress).to.equals(WETH_MAINNET_ADDRESS);
            expect(minAmountToDeposit.toString()).to.equals(amount.toString());

            expect(timeDiff).to.be.lessThanOrEqual(120);
        });

        it("Should revert if already initialized", async function() {
            const amount = hre.ethers.parseEther("0.001");
            const daysCount = 15;

            const {lotteryAave, owner} = await deployInitializedLotteryAave(amount, daysCount);
            await expect(lotteryAave.init(
                LOTTERY_NAME,
                WETH_MAINNET_ADDRESS,
                aWETH_MAINNET_ADDRESS,
                amount,
                daysCount,
                owner
            )).to.be.revertedWith("Already initialized");
        })
    })

    describe("Deposit tests", async function() {

        it("Should revert if deposit time has expired", async function() {
            const daysCount = 15;
            const {lotteryAave, owner} =
                await deployInitializedLotteryAave(hre.ethers.parseEther("0.001"), daysCount);
            const lotteryAddress = await lotteryAave.getAddress();

            await sendWethTokensToUser(owner, hre.ethers.parseEther("10"));
            await approveToContract(owner, lotteryAddress, WETH_MAINNET_ADDRESS, hre.ethers.parseEther("10"));
            await time.increase(DAY * (daysCount - 2));

            await expect(lotteryAave.deposit(hre.ethers.parseEther("0.002")))
                .to.be.revertedWith("The deposit time has expired");
        });

        it("Should revert if amount not enough", async function() {
            const minAmount = hre.ethers.parseEther("0.001");
            const {lotteryAave, owner} =
                await deployInitializedLotteryAave(minAmount, 15);
            const lotteryAddress = await lotteryAave.getAddress();

            const amountToDeposit = hre.ethers.parseEther("0.000002");
            await sendWethTokensToUser(owner, hre.ethers.parseEther("10"));
            await approveToContract(owner, lotteryAddress, WETH_MAINNET_ADDRESS, hre.ethers.parseEther("10"));

            await expect(lotteryAave.deposit(amountToDeposit))
                .to.be.revertedWith("Amount lesser than min amount");
        });

        it("Should revert if user does not have enough funds", async function() {
            const minAmount = hre.ethers.parseEther("0.001");
            const userFunds = hre.ethers.parseEther("0.0001")
            const amountToDeposit = hre.ethers.parseEther("0.1");

            const {lotteryAave, owner} =
                await deployInitializedLotteryAave(minAmount, 15);
            const lotteryAddress = await lotteryAave.getAddress();

            await sendWethTokensToUser(owner, userFunds);
            await approveToContract(owner, lotteryAddress, WETH_MAINNET_ADDRESS, hre.ethers.parseEther("10"));

            await expect(lotteryAave.deposit(amountToDeposit)).to.be.reverted;
        });

        it("Should revert if user did not approved token transfer", async function() {
            const {lotteryAave, owner} =
                await deployInitializedLotteryAave(hre.ethers.parseEther("0.001"), 15);
            const lotteryAddress = await lotteryAave.getAddress();

            await sendWethTokensToUser(owner, hre.ethers.parseEther("10"));

            await expect(lotteryAave.deposit(hre.ethers.parseEther("0.0002"))).to.be.reverted;
        });

        it("Should deposit for the first time", async function() {
            const minAmountToDeposit = hre.ethers.parseEther("0.001");
            const userFunds = hre.ethers.parseEther("10");
            const amountToDeposit = hre.ethers.parseEther("0.1");

            const {lotteryAave, owner} =
                await deployInitializedLotteryAave(minAmountToDeposit, 15);
            const lotteryAddress = await lotteryAave.getAddress();

            await sendWethTokensToUser(owner, userFunds);
            await approveToContract(owner, lotteryAddress, WETH_MAINNET_ADDRESS, hre.ethers.parseEther("10"));

            const iWeth = await hre.ethers.getContractAt("IWeth", WETH_MAINNET_ADDRESS, owner);
            const wethBalanceBefore = await iWeth.balanceOf(owner);

            await lotteryAave.deposit(amountToDeposit);

            const wethBalanceAfter = await iWeth.balanceOf(owner);
            const balanceInProtocol = await lotteryAave.balanceOf(owner);
            const tvl = await lotteryAave.getTvl();

            expect(tvl).to.equals(amountToDeposit);
            expect(balanceInProtocol).to.equals(amountToDeposit);
            expect(wethBalanceAfter).to.equals(wethBalanceBefore - amountToDeposit);
        });

        it("Should deposit for more than once", async function() {
            const minAmountToDeposit = hre.ethers.parseEther("0.001");
            const userFunds = hre.ethers.parseEther("10");
            const amountToDeposit = hre.ethers.parseEther("0.1");

            const {lotteryAave, owner} =
                await deployInitializedLotteryAave(minAmountToDeposit, 15);
            const lotteryAddress = await lotteryAave.getAddress();

            await sendWethTokensToUser(owner, userFunds);
            await approveToContract(owner, lotteryAddress, WETH_MAINNET_ADDRESS, hre.ethers.parseEther("10"));

            const iWeth = await hre.ethers.getContractAt("IWeth", WETH_MAINNET_ADDRESS, owner);
            const wethBalanceBefore = await iWeth.balanceOf(owner);

            await lotteryAave.deposit(amountToDeposit);
            await lotteryAave.deposit(amountToDeposit);

            const wethBalanceAfter = await iWeth.balanceOf(owner);
            const balanceInProtocol = await lotteryAave.balanceOf(owner);
            const tvl = await lotteryAave.getTvl();

            const expectedAmount = hre.ethers.parseEther("0.2");

            expect(tvl).to.equals(expectedAmount);
            expect(balanceInProtocol).to.equals(expectedAmount);
            expect(wethBalanceAfter).to.equals(wethBalanceBefore - expectedAmount);
        });
    });


    describe("Withdraw tests", async function() {

        it("Should revert if balance is zero", async function() {
            const {lotteryAave} =
                await deployInitializedLotteryAave(hre.ethers.parseEther("0.001"), 15);

            await expect(lotteryAave.withdraw()).to.be.revertedWith("No funds to withdraw");
        });

        it("Should have funds after withdraw", async function() {
            const {lotteryAave, owner, addr1} =
                await deployInitializedLotteryAave(hre.ethers.parseEther("0.001"), 15);
            const iWeth = await hre.ethers.getContractAt("IWeth", WETH_MAINNET_ADDRESS, owner);

            const amountToDeposit = hre.ethers.parseEther("0.002");

            await deposit(owner, amountToDeposit, lotteryAave);
            await deposit(addr1, amountToDeposit, lotteryAave);

            const tvlBefore = await lotteryAave.getTvl();
            const balanceInWethBefore = await iWeth.balanceOf(owner);

            await lotteryAave.connect(owner).withdraw();

            const tvlAfter = await lotteryAave.getTvl();
            const ownerBalanceInProtocolAfter = await lotteryAave.balanceOf(owner);
            const balanceInWethAfter = await iWeth.balanceOf(owner);

            expect(tvlAfter).to.equals(tvlBefore - amountToDeposit);
            expect(ownerBalanceInProtocolAfter).to.equals(0);
            expect(balanceInWethAfter).to.equals(balanceInWethBefore + amountToDeposit);
        });

        it("Should revert if withdrawing twice", async function() {
            const {lotteryAave, owner} =
                await deployInitializedLotteryAave(hre.ethers.parseEther("0.001"), 15);
            const amountToDeposit = hre.ethers.parseEther("0.002");

            await deposit(owner, amountToDeposit, lotteryAave);

            await lotteryAave.connect(owner).withdraw();
            await expect(lotteryAave.connect(owner).withdraw())
                .to.be.revertedWith("No funds to withdraw")
        });

        it("Should have additional yield for winner", async function() {
            const durationInDays = 50;
            const {lotteryAave, owner} =
                await deployInitializedLotteryAave(hre.ethers.parseEther("0.001"), durationInDays);
            const iWeth = await hre.ethers.getContractAt("IWeth", WETH_MAINNET_ADDRESS, owner);

            const amountToDeposit = hre.ethers.parseEther("10");
            await deposit(owner, amountToDeposit, lotteryAave);
            await time.increase(durationInDays * DAY + 60);
            await lotteryAave.end();
            const totalYield = await lotteryAave.getTotalYield();

            const tvlBefore = await lotteryAave.getTvl();
            const balanceInWethBefore = await iWeth.balanceOf(owner);

            await lotteryAave.connect(owner).withdraw();

            const tvlAfter = await lotteryAave.getTvl();
            const ownerBalanceInProtocolAfter = await lotteryAave.balanceOf(owner);
            const balanceInWethAfter = await iWeth.balanceOf(owner);

            expect(tvlAfter).to.equals(tvlBefore - amountToDeposit);
            expect(ownerBalanceInProtocolAfter).to.equals(0);
            expect(balanceInWethAfter).to.equals(balanceInWethBefore + amountToDeposit + totalYield);
        });
    });

    describe("End tests", async function() {

        it("Should revert if end date not reached", async function() {
            const durationInDays = 15;
            const {lotteryAave} =
                await deployInitializedLotteryAave(hre.ethers.parseEther("0.001"), durationInDays);

            await expect(lotteryAave.end()).to.be.revertedWith("End date not reached");

            await time.increase((durationInDays - 1) * DAY);

            await expect(lotteryAave.end()).to.be.revertedWith("End date not reached");
        });

        it("Should revert if lottery already finished", async function() {
            const durationInDays = 50;
            const {lotteryAave, owner} =
                await deployInitializedLotteryAave(hre.ethers.parseEther("0.001"), durationInDays);

            const amountToDeposit = hre.ethers.parseEther("10");
            await deposit(owner, amountToDeposit, lotteryAave);
            await time.increase(durationInDays * DAY + 60);
            await lotteryAave.end();

            await expect(lotteryAave.end()).to.be.revertedWith("Lottery already finished");
        });

        it("Should set winner and total yield", async function() {
            const durationInDays = 50;
            const {lotteryAave, owner} =
                await deployInitializedLotteryAave(hre.ethers.parseEther("0.001"), durationInDays);

            const amountToDeposit = hre.ethers.parseEther("10");
            await deposit(owner, amountToDeposit, lotteryAave);
            await time.increase(durationInDays * DAY + 60);
            await lotteryAave.end();
            const totalYield = await lotteryAave.getTotalYield();
            const winner = await lotteryAave.getWinner();

            expect(await owner.getAddress()).to.equals(winner);
            expect(totalYield).to.not.equals(0);
        });

        it("Should send funds to admin if everyone left the lottery", async function() {
            const durationInDays = 50;
            const {lotteryAave, owner, addr1, addr2} =
                await deployInitializedLotteryAave(hre.ethers.parseEther("0.001"), durationInDays);

            const amountToDeposit = hre.ethers.parseEther("10");
            await deposit(addr1, amountToDeposit, lotteryAave);
            await deposit(addr2, amountToDeposit, lotteryAave);

            await time.increase(DAY * 10);
            await lotteryAave.connect(addr1).withdraw();

            await time.increase(DAY * 10);
            await lotteryAave.connect(addr2).withdraw();

            await time.increase(DAY*30 + 60);
            const iWeth = await hre.ethers.getContractAt("IWeth", WETH_MAINNET_ADDRESS, owner);
            const balanceBefore = await iWeth.balanceOf(owner);

            await lotteryAave.end();

            const balanceAfter = await iWeth.balanceOf(owner);
            const totalYield = await lotteryAave.getTotalYield();
            const tvl = await lotteryAave.getTvl();
            const winner = await lotteryAave.getWinner();

            expect(tvl).to.equals(0);
            expect(balanceAfter).to.equals(balanceBefore + totalYield);
            expect(await owner.getAddress()).to.equals(winner);
        });
    });

    describe("Withdraw admin tests", async function() {

        it("Should revert if lottery not finished", async function() {
            const {lotteryAave, owner} =
                await deployInitializedLotteryAave(hre.ethers.parseEther("0.001"), 15);

            await expect(lotteryAave.connect(owner).withdrawAdmin())
                .to.be.revertedWith("Lottery not finished");
        });

        it("Should revert if caller is not admin", async function() {
            const durationInDays = 15;
            const {lotteryAave, owner, addr1} =
                await deployInitializedLotteryAave(hre.ethers.parseEther("0.001"), durationInDays);

            const amountToDeposit = hre.ethers.parseEther("10");
            await deposit(addr1, amountToDeposit, lotteryAave);

            await time.increase(DAY*durationInDays + 60);
            await lotteryAave.end();

            await expect(lotteryAave.connect(addr1).withdrawAdmin())
                .to.be.revertedWith("Only admin can call");
        });

        it("Should send all funds after winner withdraw", async function() {
            const durationInDays = 30;
            const {lotteryAave, owner, addr1} =
                await deployInitializedLotteryAave(hre.ethers.parseEther("0.001"), durationInDays);
            const iWeth = await hre.ethers.getContractAt("IWeth", WETH_MAINNET_ADDRESS, owner);

            const amountToDeposit = hre.ethers.parseEther("10");
            await deposit(addr1, amountToDeposit, lotteryAave);
            await time.increase(DAY*durationInDays + 60);
            await lotteryAave.end();
            await lotteryAave.connect(addr1).withdraw();

            const balanceBefore = await iWeth.balanceOf(owner);
            const currentYield = await lotteryAave.getCurrentYield();

            await lotteryAave.connect(owner).withdrawAdmin();

            const balanceAfter = await iWeth.balanceOf(owner);
            expect(balanceAfter).to.be.greaterThanOrEqual(balanceBefore + currentYield);
        });

        it("Should send funds before winner withdraw but without total yield", async function() {
            const durationInDays = 30;
            const {lotteryAave, owner, addr1} =
                await deployInitializedLotteryAave(hre.ethers.parseEther("0.001"), durationInDays);
            const iWeth = await hre.ethers.getContractAt("IWeth", WETH_MAINNET_ADDRESS, owner);

            const amountToDeposit = hre.ethers.parseEther("10");
            await deposit(addr1, amountToDeposit, lotteryAave);
            await time.increase(DAY*durationInDays + 60);
            await lotteryAave.end();
            const totalYieldForWinner = await lotteryAave.getTotalYield();

            await time.increase(DAY * 5);
            const totalYieldInProtocol = await lotteryAave.getCurrentYield();
            const minExpectedYieldForAdmin = totalYieldInProtocol - totalYieldForWinner;

            const balanceBefore = await iWeth.balanceOf(owner);
            await lotteryAave.connect(owner).withdrawAdmin();
            const balanceAfter = await iWeth.balanceOf(owner);

            expect(balanceAfter).to.be.greaterThanOrEqual(balanceBefore + minExpectedYieldForAdmin);
            expect(balanceAfter).to.be.lessThan(balanceBefore + minExpectedYieldForAdmin + totalYieldForWinner);
        });
    });

    it("Complete round simulation", async function () {
        const minAmountToDeposit = hre.ethers.parseEther("0.001");
        const durationInDays = 30;

        const {lotteryAave} = await deployInitializedLotteryAave(minAmountToDeposit, durationInDays);
        const iWeth = await hre.ethers.getContractAt("IWeth", WETH_MAINNET_ADDRESS);

        const [user1, user2, user3] = await hre.ethers.getSigners();

        const user1DepositAmount = hre.ethers.parseEther("1");
        await deposit(user1, user1DepositAmount, lotteryAave);
        await time.increase(1 * DAY);

        const user2DepositAmount = hre.ethers.parseEther("3");
        await deposit(user2, user2DepositAmount, lotteryAave);
        await time.increase(9 * DAY);

        const user3DepositAmount = hre.ethers.parseEther("10")
        await deposit(user3, user3DepositAmount, lotteryAave);
        await time.increase(20 * DAY);

        await lotteryAave.end();

        const winner = await lotteryAave.getWinner();
        const totalYield = await lotteryAave.getTotalYield();

        for (let user of [user1, user2, user3]) {
            let deposited = await iWeth.balanceOf(user);
            await lotteryAave.connect(user).withdraw();
            let withdrawn = await iWeth.balanceOf(user);

            if(user === user1) deposited += user1DepositAmount;
            if(user === user2) deposited += user2DepositAmount;
            if(user === user3) deposited += user3DepositAmount;

            let diff = withdrawn - deposited;

            if(user.address === winner) {
                expect(diff).to.equals(totalYield);
            } else {
                expect(diff).to.equals(0);
            }
        }
    });
})
