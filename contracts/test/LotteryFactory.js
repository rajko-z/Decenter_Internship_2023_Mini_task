const hre = require("hardhat");
const { expect } = require("chai");
const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { networkConfig } = require("../harhat-config-helper");
const { anyUint } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { sendWethTokensToUser, getSymbolAndDecimalsOfERC20Token, sendERCTokensToUser, approveToContract, anyAddress} = require("../scripts/utils");


describe("LotteryFactory tests", function () {

    const wethTokenAddress = networkConfig[hre.network.config.chainId].wethToken;
    const daiTokenAddress = networkConfig[hre.network.config.chainId].daiToken;
    const usdcTokenAddress = networkConfig[hre.network.config.chainId].usdcToken;

    async function deployLotteryFactoryFixture() {
        const [owner, addr1, addr2] = await hre.ethers.getSigners();

        const AaveLotteryMain = await hre.ethers.getContractFactory("LotteryAave", owner);
        const aaveLotteryMain = await AaveLotteryMain.deploy();
        await aaveLotteryMain.waitForDeployment();
        const aaveLotteryMainAddress = await aaveLotteryMain.getAddress();

        const LotteryFactory = await hre.ethers.getContractFactory("LotteryFactory", owner);
        const lotteryFactory = await LotteryFactory.deploy(aaveLotteryMainAddress);
        await lotteryFactory.waitForDeployment();

        return {lotteryFactory, owner, addr1, addr2};
    }

    describe("Lottery creation", async function() {

        it("Should revert with token not supported", async function() {
            const {lotteryFactory, owner, addr1, addr2} = await loadFixture(deployLotteryFactoryFixture);

            const tokenAddress = "0x60FaAe176336dAb62e284Fe19B885B095d29fB7F";
            const lotteryName = "Test";
            const protocolId = 1;
            const minAmountToDeposit = hre.ethers.parseEther("0.01");
            const durationInDays = 12;

            await expect(lotteryFactory
                .createLottery(lotteryName, protocolId, tokenAddress, minAmountToDeposit, durationInDays))
                .to.be.revertedWith("Token not supported");
        })

        it("Should revert with Min amount not enough", async function() {
            const {lotteryFactory, owner, addr1, addr2} = await loadFixture(deployLotteryFactoryFixture);

            const lotteryName = "Test";
            const protocolId = 1;
            const minAmountToDeposit = hre.ethers.parseEther("0");
            const durationInDays = 12;

            await expect(lotteryFactory
                .createLottery(lotteryName, protocolId, wethTokenAddress, minAmountToDeposit, durationInDays))
                .to.be.revertedWith("Min amount not enough");
        })

        it("Should revert with protocol not supported", async function() {
            const {lotteryFactory, owner, addr1, addr2} = await loadFixture(deployLotteryFactoryFixture);

            const lotteryName = "Test";
            const protocolId = 11;
            const minAmountToDeposit = hre.ethers.parseEther("0.01");
            const durationInDays = 12;

            await expect(lotteryFactory
                .createLottery(lotteryName, protocolId, wethTokenAddress, minAmountToDeposit, durationInDays))
                .to.be.revertedWith("Protocol not supported");
        })

        it("Should revert with Lottery duration to short", async function() {
            const {lotteryFactory, owner, addr1, addr2} = await loadFixture(deployLotteryFactoryFixture);

            const lotteryName = "Test";
            const protocolId = 1;
            const minAmountToDeposit = hre.ethers.parseEther("0.01");
            const durationInDays = 9;

            await expect(lotteryFactory
                .createLottery(lotteryName, protocolId, wethTokenAddress, minAmountToDeposit, durationInDays))
                .to.be.revertedWith("Lottery duration to short");
        })

        it("Should create lottery", async function () {
            const {lotteryFactory, owner, addr1, addr2}
                = await loadFixture(deployLotteryFactoryFixture);

            await sendWethTokensToUser(owner, hre.ethers.parseEther("100"));
            const {symbol, decimals} = await getSymbolAndDecimalsOfERC20Token(wethTokenAddress);
            const lotteryName = "Test";
            const protocolId = 1;
            const minAmountToDeposit = hre.ethers.parseEther("0.01");
            const durationInDays = 12;

            await expect(lotteryFactory
                .createLottery(lotteryName, protocolId, wethTokenAddress, minAmountToDeposit, durationInDays))
                .to.emit(lotteryFactory, "CreatedEvent")
                .withArgs(anyAddress, owner.address, lotteryName, protocolId, wethTokenAddress, symbol, decimals, anyUint, minAmountToDeposit);
        });
    });

    describe("Fetching lotteries", async function() {

        it("Should fetch all lotteries", async function () {
            const {lotteryFactory, owner, addr1, addr2} = await loadFixture(deployLotteryFactoryFixture);

            const minAmountToDepositWeth = hre.ethers.parseEther("0.01");    
            const minAmountForDepositDai = hre.ethers.parseEther("10");
            const minAmountForDepositUsdc = "10000000";

            const txLotteryWeth1 = await lotteryFactory.connect(owner).createLottery("test1", 1, wethTokenAddress, minAmountToDepositWeth, 15);
            await txLotteryWeth1.wait();

            const txLotteryWeth2 = await lotteryFactory.connect(owner).createLottery("test2", 1, wethTokenAddress, minAmountToDepositWeth, 15);
            await txLotteryWeth2.wait();

            const txLotteryDai = await lotteryFactory.connect(addr1).createLottery("test3", 1, daiTokenAddress, minAmountForDepositDai, 20);
            await txLotteryDai.wait();

            const txLotteryUsdc = await lotteryFactory.connect(addr2).createLottery("test4", 1, usdcTokenAddress, minAmountForDepositUsdc, 30);
            await txLotteryUsdc.wait();

            const lotteries = await lotteryFactory.getLotteries(false);
            expect(lotteries.length).to.equal(4);
            expect(lotteries[0][1]).to.equal("test1");
            expect(lotteries[0][2]).to.equals(1);
            expect(lotteries[0][3]).to.equals(wethTokenAddress);
            expect(lotteries[0][6]).to.equals(0);
            expect(lotteries[0][8]).to.equals(minAmountToDepositWeth);
            expect(lotteries[0][9]).to.equals(0);

            expect(lotteries[1][1]).to.equal("test2");
            expect(lotteries[1][2]).to.equals(1);
            expect(lotteries[1][3]).to.equals(wethTokenAddress);
            expect(lotteries[1][6]).to.equals(0);
            expect(lotteries[1][8]).to.equals(minAmountToDepositWeth);
            expect(lotteries[1][9]).to.equals(0);

            expect(lotteries[2][1]).to.equal("test3");
            expect(lotteries[2][2]).to.equals(1);
            expect(lotteries[2][3]).to.equals(daiTokenAddress);
            expect(lotteries[2][6]).to.equals(0);
            expect(lotteries[2][8]).to.equals(minAmountForDepositDai);
            expect(lotteries[2][9]).to.equals(0);

            expect(lotteries[3][1]).to.equal("test4");
            expect(lotteries[3][2]).to.equals(1);
            expect(lotteries[3][3]).to.equals(usdcTokenAddress);
            expect(lotteries[3][6]).to.equals(0);
            expect(lotteries[3][8]).to.equals(minAmountForDepositUsdc);
            expect(lotteries[3][9]).to.equals(0);
        });

        it("Should fetch user lotteries", async function () {
            const {lotteryFactory, owner, addr1, addr2} = await loadFixture(deployLotteryFactoryFixture);

            const LotteryFactoryArtifact = await hre.artifacts.readArtifact("LotteryFactory");
            const lotteryFactoryABI = LotteryFactoryArtifact.abi;

            await sendWethTokensToUser(owner, hre.ethers.parseEther("100"));
            await sendERCTokensToUser(
                "0x60FaAe176336dAb62e284Fe19B885B095d29fB7F",
                daiTokenAddress,
                addr1,
                hre.ethers.parseEther("100")
            );
            await sendERCTokensToUser(
                "0x60FaAe176336dAb62e284Fe19B885B095d29fB7F",
                daiTokenAddress,
                owner,
                hre.ethers.parseEther("100")
            );

            const minAmountForDepositWeth = hre.ethers.parseEther("0.01");    
            const minAmountForDepositDai = hre.ethers.parseEther("10");
            const amountToDepositWeth = hre.ethers.parseEther("0.01");
            const amountToDepositDai = hre.ethers.parseEther("10");

            const lottery1 = await lotteryFactory.connect(owner).createLottery("test1", 1, wethTokenAddress, minAmountForDepositWeth, 15);
            const receipt1 = await lottery1.wait();
            const event1 = new hre.ethers.Interface(lotteryFactoryABI).parseLog(receipt1.logs[0]);
            const lotteryAddress1 = event1.args[0];
            const lottery1Contract = await hre.ethers.getContractAt("LotteryAave", lotteryAddress1, owner);

            await approveToContract(owner, lotteryAddress1, wethTokenAddress, hre.ethers.parseEther("10"));
            const deposit1 = await lottery1Contract.connect(owner).deposit(amountToDepositWeth);
            await deposit1.wait();


            const lottery2 = await lotteryFactory.connect(owner).createLottery("test2", 1, daiTokenAddress, minAmountForDepositDai, 20);
            const receipt2 = await lottery2.wait();
            const event2 = new hre.ethers.Interface(lotteryFactoryABI).parseLog(receipt2.logs[0]);
            const lotteryAddress2 = event2.args[0];
            const lottery2Contract = await hre.ethers.getContractAt("LotteryAave", lotteryAddress2);

            await approveToContract(owner, lotteryAddress2, daiTokenAddress, hre.ethers.parseEther("10"));
            const deposit2 = await lottery2Contract.connect(owner).deposit(amountToDepositDai);
            await deposit2.wait();

            await approveToContract(addr1, lotteryAddress2, daiTokenAddress, hre.ethers.parseEther("10"));
            const deposit3 = await lottery2Contract.connect(addr1).deposit(amountToDepositDai);
            await deposit3.wait();

            const lotteriesOwner = await lotteryFactory.connect(owner).getLotteries(true);
            const lotteriesAddr1 = await lotteryFactory.connect(addr1).getLotteries(true);

            expect(lotteriesOwner.length).to.equal(2);
            expect(lotteriesOwner[0][1]).to.equal("test1");
            expect(lotteriesOwner[0][2]).to.equals(1);
            expect(lotteriesOwner[0][3]).to.equals(wethTokenAddress);
            expect(lotteriesOwner[0][8]).to.equals(minAmountForDepositWeth);
            expect(lotteriesOwner[0][9]).not.to.equals(0);

            expect(lotteriesOwner[1][1]).to.equal("test2");
            expect(lotteriesOwner[1][2]).to.equals(1);
            expect(lotteriesOwner[1][3]).to.equals(daiTokenAddress);
            expect(lotteriesOwner[1][8]).to.equals(minAmountForDepositDai);
            expect(lotteriesOwner[0][9]).not.to.equals(0);

            expect(lotteriesAddr1.length).to.equals(1);
            expect(lotteriesAddr1[0][1]).to.equal("test2");
            expect(lotteriesAddr1[0][2]).to.equals(1);
            expect(lotteriesAddr1[0][3]).to.equals(daiTokenAddress);
            expect(lotteriesAddr1[0][8]).to.equals(minAmountForDepositDai);
            expect(lotteriesAddr1[0][9]).not.to.equals(0);
        });

        it("Should fetch zero lotteries", async function() {
            const {lotteryFactory, owner, addr1, addr2} = await loadFixture(deployLotteryFactoryFixture);

            let lotteries = await lotteryFactory.getLotteries(true);
            expect(lotteries.length).to.equal(0);

            lotteries = await lotteryFactory.getLotteries(false);
            expect(lotteries.length).to.equal(0);
        });

        it("Should fetch specific lottery by address", async function() {
            const {lotteryFactory, owner, addr1} = await loadFixture(deployLotteryFactoryFixture);

            const LotteryFactoryArtifact = await hre.artifacts.readArtifact("LotteryFactory");
            const lotteryFactoryABI = LotteryFactoryArtifact.abi;

            await sendWethTokensToUser(owner, hre.ethers.parseEther("100"));
            await sendERCTokensToUser(
                "0x60FaAe176336dAb62e284Fe19B885B095d29fB7F",
                daiTokenAddress,
                addr1,
                hre.ethers.parseEther("0.0001")
            );
            await sendERCTokensToUser(
                "0x60FaAe176336dAb62e284Fe19B885B095d29fB7F",
                daiTokenAddress,
                owner,
                hre.ethers.parseEther("0.0001")
            );

            const minAmountToDeposit = hre.ethers.parseEther("0.01");
            const amountToDeposit = hre.ethers.parseEther("0.01");

            const lottery = await lotteryFactory.connect(owner).createLottery("pot", 1, wethTokenAddress, minAmountToDeposit, 15);
            const receipt = await lottery.wait();
            const event = new hre.ethers.Interface(lotteryFactoryABI).parseLog(receipt.logs[0]);
            const lotteryAddress = event.args[0];
            const lotteryContract = await hre.ethers.getContractAt("LotteryAave", lotteryAddress, owner);

            await approveToContract(owner, lotteryAddress, wethTokenAddress, hre.ethers.parseEther("10"));
            const deposit1 = await lotteryContract.connect(owner).deposit(amountToDeposit);
            await deposit1.wait();

            await time.increase(3600 * 24);

            const lotteryData = await lotteryFactory.connect(owner).getLotteryByAddress(lotteryAddress);
            expect(lotteryData[1]).to.equal("pot");
            expect(lotteryData[2]).to.equals(1);
            expect(lotteryData[3]).to.equals(wethTokenAddress);
            expect(lotteryData[8]).to.equals(minAmountToDeposit);
            expect(lotteryData[9]).not.to.equals(0);
        });
    });

    describe("Protocol utils tests", async function() {

        it("Protocol support", async function() {
            const {lotteryFactory, owner, addr1, addr2} = await loadFixture(deployLotteryFactoryFixture);

            const supported = await lotteryFactory.protocolSupported(1);
            expect(supported).to.be.true;

            const notSupported = await lotteryFactory.protocolSupported(2);
            expect(notSupported).to.be.false;
        });

        it("Should add new protocol", async function() {
            const {lotteryFactory, owner, addr1, addr2} = await loadFixture(deployLotteryFactoryFixture);

            const exampleProtocolAddress = '0xfB12F7170FF298CDed84C793dAb9aBBEcc01E798';
            const addTx = await lotteryFactory.addProtocol(2, exampleProtocolAddress);
            await addTx.wait();
            const addedProtocol = await lotteryFactory.supportedProtocols(2);
            expect(exampleProtocolAddress).to.equals(addedProtocol);
        });

        it("Should revert for adding protocol that already exist", async function() {
            const {lotteryFactory, owner, addr1, addr2} = await loadFixture(deployLotteryFactoryFixture);

            const exampleProtocolAddress = '0xfB12F7170FF298CDed84C793dAb9aBBEcc01E798';
            await expect(lotteryFactory.addProtocol(1, exampleProtocolAddress))
                .to.be.revertedWith("Protocol already exist");
        });

        it("Should revert add operation if caller is not admin", async function() {
            const {lotteryFactory, owner, addr1, addr2} = await loadFixture(deployLotteryFactoryFixture);

            const exampleProtocolAddress = '0xfB12F7170FF298CDed84C793dAb9aBBEcc01E798';
            await expect(lotteryFactory.connect(addr1).addProtocol(2, exampleProtocolAddress))
                .to.be.revertedWith("Ownable: caller is not the owner");
        })

        it("Should remove protocol", async function() {
            const {lotteryFactory, owner, addr1, addr2} = await loadFixture(deployLotteryFactoryFixture);

            await lotteryFactory.removeProtocol(1);
            const protocolAddress = await lotteryFactory.supportedProtocols(1);
            expect(protocolAddress).to.equal("0x0000000000000000000000000000000000000000");
        });

        it("Should revert remove operation if caller is not admin", async function() {
            const {lotteryFactory, owner, addr1, addr2} = await loadFixture(deployLotteryFactoryFixture);

            await expect(lotteryFactory.connect(addr1).removeProtocol(1))
                .to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("Token utils tests", async function() {

        const stEth = "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84";
        const aStEth = "0x1982b2F5814301d4e9a8b0201555376e62F82428";
        const notFoundTokenAddress = '0xfB12F7170FF298CDed84C793dAb9aBBEcc01E798';

        it("Should add new token", async function() {
            const {lotteryFactory, owner, addr1, addr2} = await loadFixture(deployLotteryFactoryFixture);
            const value = hre.ethers.parseEther("0.1");

            await lotteryFactory.addToken(stEth, aStEth, value);
            expect(await lotteryFactory.tokenSupported(stEth)).to.be.true;
            expect(await lotteryFactory.tokens(stEth)).to.equals(value);
            expect(await lotteryFactory.tokenToAtoken(stEth)).to.equals(aStEth);
        });

        it("Should revert add operation if amount is zero", async function() {
            const {lotteryFactory, owner, addr1, addr2} = await loadFixture(deployLotteryFactoryFixture);
            await expect(lotteryFactory.addToken(stEth, aStEth, 0))
                .to.be.revertedWith("Amount should be positive");
        })

        it("Should remove token", async function() {
            const {lotteryFactory, owner, addr1, addr2} = await loadFixture(deployLotteryFactoryFixture);
            await lotteryFactory.removeToken(wethTokenAddress);
            expect(await lotteryFactory.tokenSupported(wethTokenAddress)).to.be.false;
            expect(await lotteryFactory.tokenToAtoken(wethTokenAddress))
                .to.equals("0x0000000000000000000000000000000000000000");
        });

        it("Should update token min amount", async function() {
            const {lotteryFactory, owner, addr1, addr2} = await loadFixture(deployLotteryFactoryFixture);
            const newAmount = hre.ethers.parseEther("120");
            await lotteryFactory.changeTokenMinAmount(wethTokenAddress, newAmount);
            expect(await lotteryFactory.tokens(wethTokenAddress)).to.equals(newAmount);
        });

        it("Should revert token update for zero amount", async function() {
            const {lotteryFactory, owner, addr1, addr2} = await loadFixture(deployLotteryFactoryFixture);
            await expect(lotteryFactory.changeTokenMinAmount(wethTokenAddress, 0))
                .to.be.revertedWith("Amount should be positive");
        });

        it("Should revert token update for not found token", async function() {
            const {lotteryFactory, owner, addr1, addr2} = await loadFixture(deployLotteryFactoryFixture);
            await expect(lotteryFactory.changeTokenMinAmount(stEth, 100))
                .to.be.revertedWith("Token is not present");
        });

        it("Should revert operations if caller is not admin", async function() {
            const {lotteryFactory, owner, addr1, addr2} = await loadFixture(deployLotteryFactoryFixture);

            await expect(lotteryFactory.connect(addr1).addToken(stEth, aStEth, hre.ethers.parseEther("1")))
                  .to.be.revertedWith("Ownable: caller is not the owner");

            await expect(lotteryFactory.connect(addr1).removeToken(wethTokenAddress))
                .to.be.revertedWith("Ownable: caller is not the owner");

            await expect(lotteryFactory.connect(addr1).changeTokenMinAmount(wethTokenAddress, 100))
                .to.be.revertedWith("Ownable: caller is not the owner");
        });
    });
});
