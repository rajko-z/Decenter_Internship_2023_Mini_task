const hre = require("hardhat");

async function main() {
    await hre.run("compile");

    const LotteryFactory = await hre.ethers.getContractFactory("LotteryFactory");
    const lotteryFactory = await LotteryFactory.deploy();
    await lotteryFactory.waitForDeployment();

    const addressContract = await lotteryFactory.getAddress();
    console.log("LotteryFactory address:" + addressContract);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
