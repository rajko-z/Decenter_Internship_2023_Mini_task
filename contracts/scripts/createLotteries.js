const hre = require("hardhat");
const {networkConfig} = require("../harhat-config-helper");


// first call deployLotteryFactory.js i uzmi vrednost
const FACTORY_ADDRESS = "0x9155497EAE31D432C0b13dBCc0615a37f55a2c87";


async function sendWethTokensToUser(toAddress) {
    const iWeth = await hre.ethers.getContractAt(
        "IWeth", networkConfig[hre.network.config.chainId].wethToken, toAddress);

    const amount = hre.ethers.parseEther("1");
    const txResponse = await iWeth.deposit({value: amount,});
    await txResponse.wait();
}

async function approveToLottery(owner, lotteryAddress, tokenAddress, amount) {
    const erc20Token = await hre.ethers.getContractAt("IERC20", tokenAddress, owner);
    const tx = await erc20Token.approve(lotteryAddress, amount);
    await tx.wait();
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


async function main() {
    await hre.run("compile");

    const [owner, addr1, addr2] = await hre.ethers.getSigners();
    const lotteryFactory = await hre.ethers.getContractAt("LotteryFactory", FACTORY_ADDRESS);

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

    console.log("Size:" + lotteriesOwner.length);
    console.log(lotteriesOwner[0][0]);
    console.log(lotteriesOwner[1][0]);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
