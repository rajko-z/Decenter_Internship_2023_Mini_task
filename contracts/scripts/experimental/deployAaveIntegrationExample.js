const hre = require("hardhat");
const {networkConfig} = require("../../harhat-config-helper");

async function main() {
    await hre.run("compile");

    const AaveIntegration = await hre.ethers.getContractFactory("AaveIntegrationExample");
    const aaveIntegration = await AaveIntegration.deploy(
        networkConfig[hre.network.config.chainId].poolAddressProvider,
        networkConfig[hre.network.config.chainId].wethToken);
    await aaveIntegration.waitForDeployment();

    const addressContract = await aaveIntegration.getAddress();
    console.log(addressContract);
}

async function deployContract() {
    await hre.run("compile");

    const AaveIntegration = await hre.ethers.getContractFactory("AaveIntegrationExample");
    const aaveIntegration = await AaveIntegration.deploy(
        networkConfig[hre.network.config.chainId].poolAddressProvider,
        networkConfig[hre.network.config.chainId].wethToken);
    await aaveIntegration.waitForDeployment();

    const addressContract = await aaveIntegration.getAddress();
    console.log("Deployovan contract: " + addressContract);
    return aaveIntegration;
}

module.exports = { deployContract }

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
