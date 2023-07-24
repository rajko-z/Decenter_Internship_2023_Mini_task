const hre = require("hardhat");
const {networkConfig} = require("../../harhat-config-helper");
const { deployLotteryFactory } = require("../deployLotteryFactory");
const {sendWethTokensToUser, sendERCTokensToUser, approveToContract} = require("../utils");

async function main() {
    await hre.run("compile");
    const wethTokenAddress = networkConfig[hre.network.config.chainId].wethToken;
    const daiTokenAddress = networkConfig[hre.network.config.chainId].daiToken;
    const usdcTokenAddress = networkConfig[hre.network.config.chainId].usdcToken;

    const [owner, addr1] = await hre.ethers.getSigners();
    const lotteryFactory = await deployLotteryFactory();
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

    const minAmountToDeposit = hre.ethers.parseEther("0.00001");
    const amountToDeposit = hre.ethers.parseEther("0.00001");

    const lottery1 = await lotteryFactory.connect(owner).createLottery("test1", 1, wethTokenAddress, minAmountToDeposit, 15);
    const receipt1 = await lottery1.wait();
    const event1 = new hre.ethers.Interface(lotteryFactoryABI).parseLog(receipt1.logs[0]);
    const lotteryAddress1 = event1.args[0];
    const lottery1Contract = await hre.ethers.getContractAt("LotteryAave", lotteryAddress1, owner);

    await approveToContract(owner, lotteryAddress1, wethTokenAddress, hre.ethers.parseEther("10"));
    const deposit1 = await lottery1Contract.connect(owner).deposit(amountToDeposit);
    await deposit1.wait();


    const lottery2 = await lotteryFactory.connect(owner).createLottery("test2", 1, daiTokenAddress, minAmountToDeposit, 20);
    const receipt2 = await lottery2.wait();
    const event2 = new hre.ethers.Interface(lotteryFactoryABI).parseLog(receipt2.logs[0]);
    const lotteryAddress2 = event2.args[0];
    const lottery2Contract = await hre.ethers.getContractAt("LotteryAave", lotteryAddress2);

    await approveToContract(owner, lotteryAddress2, daiTokenAddress, hre.ethers.parseEther("10"));
    const deposit2 = await lottery2Contract.connect(owner).deposit(amountToDeposit);
    await deposit2.wait();

    await approveToContract(addr1, lotteryAddress2, daiTokenAddress, hre.ethers.parseEther("10"));
    const deposit3 = await lottery2Contract.connect(addr1).deposit(amountToDeposit);
    await deposit3.wait();

    const lotteriesOwner = await lotteryFactory.connect(owner).getLotteries(true);

    console.log("Size:" + lotteriesOwner.length);
    console.log(lotteriesOwner[0][0]);
    console.log(lotteriesOwner[1][0]);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
