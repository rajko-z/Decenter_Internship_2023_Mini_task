const {expect} = require("chai");
const hre = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const {networkConfig} = require("../harhat-config-helper");
const {anyUint} = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe("Lottery factory contract", function () {

    async function deployLotteryFactoryFixture() {
        const [owner, addr1, addr2] = await hre.ethers.getSigners();
        const LotteryFactory = await hre.ethers.getContractFactory("LotteryFactory", owner);
        const lotteryFactory = await LotteryFactory.deploy();
        await lotteryFactory.waitForDeployment();

        return {lotteryFactory, owner, addr1, addr2};
    }

    async function sendWethTokensToUser(toAddress) {
        const iWeth = await hre.ethers.getContractAt(
            "IWeth", networkConfig[hre.network.config.chainId].wethToken, toAddress);

        const amount = hre.ethers.parseEther("1");
        const txResponse = await iWeth.deposit({value: amount,});
        await txResponse.wait();
    }

    async function sendERCTokensToUser(impersonatedAddress, tokenAddress, toAddress, amount) {
        const signer = await hre.ethers.getImpersonatedSigner(impersonatedAddress);
        const ercToken = await hre.ethers.getContractAt("IERC20", tokenAddress, signer);
        const txTransfer = await ercToken.transfer(toAddress, amount);
        await txTransfer.wait();
    }

    async function getSymbolAndDecimalsOfERC20Token(tokenAddress) {
        const [owner] = await hre.ethers.getSigners();
        const erc20Token = await hre.ethers.getContractAt("IERC20", tokenAddress, owner);
        const symbol = await erc20Token.symbol();
        const decimals = await erc20Token.decimals();
        return {symbol, decimals};
    }

    function anyAddress(address) {
        return address.startsWith("0x");
    }

    async function approveToLottery(owner, lotteryAddress, tokenAddress, amount) {
        const erc20Token = await hre.ethers.getContractAt("IERC20", tokenAddress, owner);
        const tx = await erc20Token.approve(lotteryAddress, amount);
        await tx.wait();
    }

    it("Should revert with token not supported", async function() {
        const {lotteryFactory, owner, addr1, addr2}
            = await loadFixture(deployLotteryFactoryFixture);

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
        const {lotteryFactory, owner, addr1, addr2}
            = await loadFixture(deployLotteryFactoryFixture);

        const tokenAddress = networkConfig[hre.network.config.chainId].wethToken;
        const lotteryName = "Test";
        const protocolId = 1;
        const minAmountToDeposit = hre.ethers.parseEther("0");
        const durationInDays = 12;

        await expect(lotteryFactory
            .createLottery(lotteryName, protocolId, tokenAddress, minAmountToDeposit, durationInDays))
            .to.be.revertedWith("Min amount not enough");
    })


    it("Should revert with protocol not supported", async function() {
        const {lotteryFactory, owner, addr1, addr2}
            = await loadFixture(deployLotteryFactoryFixture);

        const tokenAddress = networkConfig[hre.network.config.chainId].wethToken;
        const lotteryName = "Test";
        const protocolId = 11;
        const minAmountToDeposit = hre.ethers.parseEther("0.01");
        const durationInDays = 12;

        await expect(lotteryFactory
            .createLottery(lotteryName, protocolId, tokenAddress, minAmountToDeposit, durationInDays))
            .to.be.revertedWith("Protocol not supported");
    })

    it("Create lottery", async function () {
        const {lotteryFactory, owner, addr1, addr2}
            = await loadFixture(deployLotteryFactoryFixture);

        const tokenAddress = networkConfig[hre.network.config.chainId].wethToken;
        await sendWethTokensToUser(owner);
        const {symbol, decimals} = await getSymbolAndDecimalsOfERC20Token(tokenAddress);
        const lotteryName = "Test";
        const protocolId = 1;
        const minAmountToDeposit = hre.ethers.parseEther("0.01");
        const durationInDays = 12;

        await expect(lotteryFactory
            .createLottery(lotteryName, protocolId, tokenAddress, minAmountToDeposit, durationInDays))
            .to.emit(lotteryFactory, "CreatedEvent")
            .withArgs(anyAddress, owner.address, lotteryName, protocolId, tokenAddress, symbol, decimals, anyUint, minAmountToDeposit);
    });

    it("Fetch all lotteries", async function () {
        const {lotteryFactory, owner, addr1, addr2}
            = await loadFixture(deployLotteryFactoryFixture);

        await sendWethTokensToUser(owner);
        await sendERCTokensToUser(
            "0x60FaAe176336dAb62e284Fe19B885B095d29fB7F",
            networkConfig[hre.network.config.chainId].daiToken,
            addr1,
            hre.ethers.parseEther("0.0001")
        );
        await sendERCTokensToUser(
            "0x7713974908Be4BEd47172370115e8b1219F4A5f0",
            networkConfig[hre.network.config.chainId].usdcToken,
            addr2,
            hre.ethers.parseEther("0.0001")
        );

        const amount = hre.ethers.parseEther("0.00001");
        const wethTokenAddress = networkConfig[hre.network.config.chainId].wethToken;
        const daiTokenAddress = networkConfig[hre.network.config.chainId].daiToken;
        const usdcTokenAddress = networkConfig[hre.network.config.chainId].usdcToken;

        const txLotteryWeth1 = await lotteryFactory.connect(owner).createLottery("test1", 1, wethTokenAddress, amount, 15);
        await txLotteryWeth1.wait();

        const txLotteryWeth2 = await lotteryFactory.connect(owner).createLottery("test2", 1, wethTokenAddress, amount, 15);
        await txLotteryWeth2.wait();

        const txLotteryDai = await lotteryFactory.connect(addr1).createLottery("test3", 1, daiTokenAddress, amount, 20);
        await txLotteryDai.wait();

        const txLotteryUsdc = await lotteryFactory.connect(addr2).createLottery("test4", 1, usdcTokenAddress, amount, 30);
        await txLotteryUsdc.wait();

        const lotteries = await lotteryFactory.getLotteries(false);
        expect(lotteries.length).to.equal(4);
        expect(lotteries[0][1]).to.equal("test1");
        expect(lotteries[0][2]).to.equals(1);
        expect(lotteries[0][3]).to.equals(wethTokenAddress);
        expect(lotteries[0][6]).to.equals(0);
        expect(lotteries[0][8]).to.equals(amount);
        expect(lotteries[0][9]).to.equals(0);

        expect(lotteries[1][1]).to.equal("test2");
        expect(lotteries[1][2]).to.equals(1);
        expect(lotteries[1][3]).to.equals(wethTokenAddress);
        expect(lotteries[1][6]).to.equals(0);
        expect(lotteries[1][8]).to.equals(amount);
        expect(lotteries[1][9]).to.equals(0);

        expect(lotteries[2][1]).to.equal("test3");
        expect(lotteries[2][2]).to.equals(1);
        expect(lotteries[2][3]).to.equals(daiTokenAddress);
        expect(lotteries[2][6]).to.equals(0);
        expect(lotteries[2][8]).to.equals(amount);
        expect(lotteries[2][9]).to.equals(0);

        expect(lotteries[3][1]).to.equal("test4");
        expect(lotteries[3][2]).to.equals(1);
        expect(lotteries[3][3]).to.equals(usdcTokenAddress);
        expect(lotteries[3][6]).to.equals(0);
        expect(lotteries[3][8]).to.equals(amount);
        expect(lotteries[3][9]).to.equals(0);
    });

    it("Fetch user lotteries", async function () {
        const {lotteryFactory, owner, addr1, addr2}
            = await loadFixture(deployLotteryFactoryFixture);

        const LotteryFactoryArtifact = await hre.artifacts.readArtifact("LotteryFactory");
        const lotteryFactoryABI = LotteryFactoryArtifact.abi;

        await sendWethTokensToUser(owner);
        await sendERCTokensToUser(
            "0x60FaAe176336dAb62e284Fe19B885B095d29fB7F",
            networkConfig[hre.network.config.chainId].daiToken,
            addr1,
            hre.ethers.parseEther("0.0001")
        );
        await sendERCTokensToUser(
            "0x60FaAe176336dAb62e284Fe19B885B095d29fB7F",
            networkConfig[hre.network.config.chainId].daiToken,
            owner,
            hre.ethers.parseEther("0.0001")
        );

        const minAmountToDeposit = hre.ethers.parseEther("0.00001");
        const amountToDeposit = hre.ethers.parseEther("0.00001");

        const wethTokenAddress = networkConfig[hre.network.config.chainId].wethToken;
        const daiTokenAddress = networkConfig[hre.network.config.chainId].daiToken;

        const txLotteryWeth1 = await lotteryFactory.connect(owner).createLottery("test1", 1, wethTokenAddress, minAmountToDeposit, 15);
        const receipt1 = await txLotteryWeth1.wait();
        const event = new hre.ethers.Interface(lotteryFactoryABI).parseLog(receipt1.logs[0]);
        const lotteryAddr1 = event.args[0];
        await approveToLottery(owner, lotteryAddr1, wethTokenAddress, hre.ethers.parseEther("10"));
        const lottery1Contract = await hre.ethers.getContractAt("LotteryAave", lotteryAddr1, owner);
        const txDeposit1 = await lottery1Contract.connect(owner).deposit(amountToDeposit);
        await txDeposit1.wait();

        const txLotteryDai2 = await lotteryFactory.connect(owner).createLottery("test2", 1, daiTokenAddress, minAmountToDeposit, 20);
        const receipt2 = await txLotteryDai2.wait();
        const event2 = new hre.ethers.Interface(lotteryFactoryABI).parseLog(receipt2.logs[0]);
        const lotteryAddr2 = event2.args[0];
        await approveToLottery(owner, lotteryAddr2, daiTokenAddress, hre.ethers.parseEther("10"));
        await approveToLottery(addr1, lotteryAddr2, daiTokenAddress, hre.ethers.parseEther("10"));
        const lottery2Contract = await hre.ethers.getContractAt("LotteryAave", lotteryAddr2);
        const txDeposit2 = await lottery2Contract.connect(owner).deposit(amountToDeposit);
        await txDeposit2.wait();
        const txDeposit3 = await lottery2Contract.connect(addr1).deposit(amountToDeposit);
        await txDeposit3.wait();

        const lotteriesOwner = await lotteryFactory.connect(owner).getLotteries(true);
        const lotteriesAddr1 = await lotteryFactory.connect(addr1).getLotteries(true);

        expect(lotteriesOwner.length).to.equal(2);
        expect(lotteriesOwner[0][1]).to.equal("test1");
        expect(lotteriesOwner[0][2]).to.equals(1);
        expect(lotteriesOwner[0][3]).to.equals(wethTokenAddress);
        expect(lotteriesOwner[0][8]).to.equals(minAmountToDeposit);
        expect(lotteriesOwner[0][9]).not.to.equals(0);

        expect(lotteriesOwner[1][1]).to.equal("test2");
        expect(lotteriesOwner[1][2]).to.equals(1);
        expect(lotteriesOwner[1][3]).to.equals(daiTokenAddress);
        expect(lotteriesOwner[1][8]).to.equals(minAmountToDeposit);
        expect(lotteriesOwner[0][9]).not.to.equals(0);

        expect(lotteriesAddr1.length).to.equals(1);
        expect(lotteriesAddr1[0][1]).to.equal("test2");
        expect(lotteriesAddr1[0][2]).to.equals(1);
        expect(lotteriesAddr1[0][3]).to.equals(daiTokenAddress);
        expect(lotteriesAddr1[0][8]).to.equals(minAmountToDeposit);
        expect(lotteriesAddr1[0][9]).not.to.equals(0);
    });

});