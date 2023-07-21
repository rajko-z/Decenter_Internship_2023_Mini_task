const hre = require("hardhat");
const {networkConfig} = require("../harhat-config-helper");


// first call deployLotteryFactory.js i uzmi vrednost
const FACTORY_ADDRESS = "0x9155497EAE31D432C0b13dBCc0615a37f55a2c87";

async function sendWethTokensToUser(toAddress) {
    const signer = await hre.ethers.getSigner(toAddress);

    const iWeth = await hre.ethers.getContractAt(
        "IWeth", networkConfig[hre.network.config.chainId].wethToken);

    const amount = hre.ethers.parseEther("10");
    const txResponse = await iWeth.connect(signer).deposit({value: amount,});
    await txResponse.wait();
}


async function checkUserBalance(tokenAddress, userAddress) {
    const signer = await hre.ethers.getSigner(userAddress);
    const erc20Token = await hre.ethers.getContractAt("IERC20", tokenAddress);
    const balance = await erc20Token.connect(signer).balanceOf(userAddress);
    return balance;
}


async function main() {

    await hre.run("compile");

    const owner = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
   
    await sendWethTokensToUser(owner);

    const wETHAddress = networkConfig[hre.network.config.chainId].wethToken;
    const balance = await checkUserBalance(wETHAddress, owner)
    console.log("user's balance:", balance)


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
