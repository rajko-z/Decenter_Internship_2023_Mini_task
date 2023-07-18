const hre = require("hardhat");

const { networkConfig } = require("../../harhat-config-helper");

async function sendWethToken(amount) {
    const [ deployer ] = await hre.ethers.getSigners();
    console.log(deployer.address);

    const iWeth = await hre.ethers.getContractAt(
        "IWeth", networkConfig[hre.network.config.chainId].wethToken, deployer);

    const txResponse = await iWeth.deposit({value: amount, });
    await txResponse.wait();
    const wethBalance = await iWeth.balanceOf(deployer);

    console.log(`Address: ${deployer.address} has ${wethBalance} WETH`);
}

module.exports = { sendWethToken }
