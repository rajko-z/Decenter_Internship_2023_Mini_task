const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { networkConfig } = require("../harhat-config-helper");

describe("LotteryAave", function() {

    aDAI_MAINNET_ADDRESS  = networkConfig[hre.network.config.chainId].aDaiToken;
    aUSDC_MAINNET_ADDRESS = networkConfig[hre.network.config.chainId].aUsdcToken;
    aWETH_MAINNET_ADDRESS = networkConfig[hre.network.config.chainId].aWethToken;

    DAI_MAINNET_ADDRESS  = networkConfig[hre.network.config.chainId].daiToken;
    USDC_MAINNET_ADDRESS = networkConfig[hre.network.config.chainId].usdcToken;
    WETH_MAINNET_ADDRESS = networkConfig[hre.network.config.chainId].wethToken;

    async function sendWethTokensToUser(toAddress) {
        const iWeth = await hre.ethers.getContractAt(
            "IWeth", networkConfig[hre.network.config.chainId].wethToken, toAddress);

        const amount = hre.ethers.parseEther("12");
        const txResponse = await iWeth.deposit({value: amount,});
        await txResponse.wait();
    }

    async function sendERCTokensToUser(impersonatedAddress, tokenAddress, toAddress, amount) {
        const signer = await hre.ethers.getImpersonatedSigner(impersonatedAddress);
        const ercToken = await hre.ethers.getContractAt("IERC20", tokenAddress, signer);
        const txTransfer = await ercToken.transfer(toAddress, amount);
        await txTransfer.wait();
    }
    
    async function approveToLottery(owner, lotteryAddress, tokenAddress, amount) {
        const erc20Token = await hre.ethers.getContractAt("IERC20", tokenAddress, owner);
        const tx = await erc20Token.approve(lotteryAddress, amount);
        await tx.wait();
    }

    function anyAddress(address) {
        return address.startsWith("0x");
    }

    it("Deploy", async function () {

        const [signer] = await hre.ethers.getSigners();
        await sendWethTokensToUser(signer);

        const lotteryName = "AAVE-TEST";
        const tokenAddress = WETH_MAINNET_ADDRESS;
        const minAmountToDeposit = hre.ethers.parseEther("0.01");
        const durationInDays = 12;

        const LotteryAave = await hre.ethers.getContractFactory("LotteryAave");
        const lotteryAave = await LotteryAave.deploy(
            lotteryName, 
            tokenAddress, 
            aWETH_MAINNET_ADDRESS,
            minAmountToDeposit, 
            durationInDays
        );

        expect(anyAddress(lotteryAave.target));
    });

    it("Deposit", async function () {
    
        const [signer] = await hre.ethers.getSigners();
        await sendWethTokensToUser(signer);

        const iWeth = await hre.ethers.getContractAt(
            "IWeth", networkConfig[hre.network.config.chainId].wethToken, signer);

        const lotteryName = "AAVE-TEST";
        const tokenAddress = WETH_MAINNET_ADDRESS;
        const minAmountToDeposit = hre.ethers.parseEther("0.001");
        const durationInDays = 12;

        const LotteryAave = await hre.ethers.getContractFactory("LotteryAave");
        const lotteryAave = await LotteryAave.deploy(
            lotteryName, 
            tokenAddress, 
            aWETH_MAINNET_ADDRESS,
            minAmountToDeposit, 
            durationInDays
        );

        var before_deposit = await iWeth.balanceOf(signer);

        await approveToLottery(signer, lotteryAave, WETH_MAINNET_ADDRESS, hre.ethers.parseEther("10"));
        await lotteryAave.connect(signer).deposit(hre.ethers.parseEther("0.01"));

        var after_deposit = await iWeth.balanceOf(signer);

        expect(after_deposit - before_deposit == hre.ethers.parseEther("0.01"));
        expect(await lotteryAave.getTvl() == hre.ethers.parseEther("0.01"));
    });

    it("Withdraw", async function () {
    
        const [signer, other] = await hre.ethers.getSigners();
        await sendWethTokensToUser(signer);
        await sendWethTokensToUser(other);

        const lotteryName = "AAVE-TEST";
        const tokenAddress = WETH_MAINNET_ADDRESS;
        const minAmountToDeposit = hre.ethers.parseEther("0.001");
        const durationInDays = 12;

        const LotteryAave = await hre.ethers.getContractFactory("LotteryAave");
        const lotteryAave = await LotteryAave.deploy(
            lotteryName, 
            tokenAddress, 
            aWETH_MAINNET_ADDRESS,
            minAmountToDeposit, 
            durationInDays
        );

        await approveToLottery(signer, lotteryAave, WETH_MAINNET_ADDRESS, hre.ethers.parseEther("10"));
        await lotteryAave.connect(signer).deposit(hre.ethers.parseEther("0.03"));
        await approveToLottery(other, lotteryAave, WETH_MAINNET_ADDRESS, hre.ethers.parseEther("10"));
        await lotteryAave.connect(other).deposit(hre.ethers.parseEther("0.02"));

        expect(await lotteryAave.getTvl()).to.equals(hre.ethers.parseEther("0.05"));

        await lotteryAave.connect(signer).withdraw();

        expect(await lotteryAave.getTvl()).to.equals(hre.ethers.parseEther("0.02"));
    });

    it("Complete round simulation", async function () {
    
        const [user1, user2, user3] = await hre.ethers.getSigners();
        await sendWethTokensToUser(user1);
        await sendWethTokensToUser(user2);
        await sendWethTokensToUser(user3);

        const signer = user1;

        const iWeth = await hre.ethers.getContractAt(
            "IWeth", networkConfig[hre.network.config.chainId].wethToken, signer);

        const lotteryName = "AAVE-TEST";
        const tokenAddress = WETH_MAINNET_ADDRESS;
        const minAmountToDeposit = hre.ethers.parseEther("0.001");
        const durationInDays = 30;

        const LotteryAave = await hre.ethers.getContractFactory("LotteryAave");
        const lotteryAave = await LotteryAave.deploy(
            lotteryName, 
            tokenAddress, 
            aWETH_MAINNET_ADDRESS,
            minAmountToDeposit, 
            durationInDays
        );

        await approveToLottery(user1, lotteryAave, WETH_MAINNET_ADDRESS, hre.ethers.parseEther("10"));
        await lotteryAave.connect(user1).deposit(hre.ethers.parseEther("1"));

        await time.increase(3600 * 24 * 1);

        await approveToLottery(user2, lotteryAave, WETH_MAINNET_ADDRESS, hre.ethers.parseEther("10"));
        await lotteryAave.connect(user2).deposit(hre.ethers.parseEther("3"));

        await time.increase(3600 * 24 * 9);

        await approveToLottery(user3, lotteryAave, WETH_MAINNET_ADDRESS, hre.ethers.parseEther("10"));
        await lotteryAave.connect(user3).deposit(hre.ethers.parseEther("10"));

        await time.increase(3600 * 24 * 20);

        await lotteryAave.connect(user1).end();

        var winner = await lotteryAave.getWinner();
        winner = winner.toLowerCase();
        totalYield = await lotteryAave.getTotalYield();

        // console.log("Winner:", winner);
        // console.log("Total yield:", totalYield);

        for (let user of [user1, user2, user3]) {
            let deposited = await iWeth.balanceOf(user);
            await lotteryAave.connect(user).withdraw();
            let withdrawn = await iWeth.balanceOf(user);

            if(user == user1) deposited += hre.ethers.parseEther("1");
            if(user == user2) deposited += hre.ethers.parseEther("3");
            if(user == user3) deposited += hre.ethers.parseEther("10");

            let diff = withdrawn - deposited;

            if(user.address == winner) {
                expect(diff == totalYield);         
            }
            else {
                expect(diff == 0);
            }
        }
    });


})