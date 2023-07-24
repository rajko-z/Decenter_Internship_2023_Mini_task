const hre = require("hardhat");
const {networkConfig} = require("../../harhat-config-helper");
const { deployLotteryFactory } = require("../deployLotteryFactory");
const {sendWethTokensToUser, sendERCTokensToUser, approveToContract} = require("../utils");
const DAI_MAINNET_ADDRESS  = networkConfig[hre.network.config.chainId].daiToken;
const USDC_MAINNET_ADDRESS = networkConfig[hre.network.config.chainId].usdcToken;
const WETH_MAINNET_ADDRESS = networkConfig[hre.network.config.chainId].wethToken;

async function sendUSDCTokens(toAddress) {
    await sendERCTokensToUser(
        "0x51eDF02152EBfb338e03E30d65C15fBf06cc9ECC",
        USDC_MAINNET_ADDRESS,
        toAddress,
        "10000000000000"
    );
}

async function sendDAITokens(toAddress) {
    await sendERCTokensToUser(
        "0x60FaAe176336dAb62e284Fe19B885B095d29fB7F",
        DAI_MAINNET_ADDRESS,
        toAddress,
        hre.ethers.parseEther("100")
    );
}

async function sendTokens(addr1, addr2) {
    await sendWethTokensToUser(addr1, hre.ethers.parseEther("100"));
    await sendWethTokensToUser(addr2, hre.ethers.parseEther("100"));

    await sendDAITokens(addr1);
    await sendDAITokens(addr2);

    await sendUSDCTokens(addr1);
    await sendUSDCTokens(addr2);
}


async function main() {
    await hre.run("compile");

    const [owner, addr1] = await hre.ethers.getSigners();
    const lotteryFactory = await deployLotteryFactory();
    const LotteryFactoryArtifact = await hre.artifacts.readArtifact("LotteryFactory");
    const lotteryFactoryABI = LotteryFactoryArtifact.abi;

    await sendTokens(owner, addr1);

    const minAmountToDeposit = hre.ethers.parseEther("0.00001");
    const amountToDeposit = hre.ethers.parseEther("0.00001");

    const lottery1 = await lotteryFactory.connect(owner).createLottery("test1", 1, WETH_MAINNET_ADDRESS, minAmountToDeposit, 15);
    const receipt1 = await lottery1.wait();
    const event1 = new hre.ethers.Interface(lotteryFactoryABI).parseLog(receipt1.logs[0]);
    const lotteryAddress1 = event1.args[0];
    const lottery1Contract = await hre.ethers.getContractAt("LotteryAave", lotteryAddress1, owner);

    await approveToContract(owner, lotteryAddress1, WETH_MAINNET_ADDRESS, hre.ethers.parseEther("10"));
    const deposit1 = await lottery1Contract.connect(owner).deposit(amountToDeposit);
    await deposit1.wait();


    const lottery2 = await lotteryFactory.connect(owner).createLottery("test2", 1, DAI_MAINNET_ADDRESS, minAmountToDeposit, 20);
    const receipt2 = await lottery2.wait();
    const event2 = new hre.ethers.Interface(lotteryFactoryABI).parseLog(receipt2.logs[0]);
    const lotteryAddress2 = event2.args[0];
    const lottery2Contract = await hre.ethers.getContractAt("LotteryAave", lotteryAddress2);

    await approveToContract(owner, lotteryAddress2, DAI_MAINNET_ADDRESS, hre.ethers.parseEther("10"));
    const deposit2 = await lottery2Contract.connect(owner).deposit(amountToDeposit);
    await deposit2.wait();

    await approveToContract(addr1, lotteryAddress2, DAI_MAINNET_ADDRESS, hre.ethers.parseEther("10"));
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
