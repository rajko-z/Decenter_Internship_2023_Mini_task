const hre = require("hardhat");
const {networkConfig} = require("../../harhat-config-helper");

async function main() {
    await hre.run("compile");

    const [owner, addr1] = await hre.ethers.getSigners();
    const lotteryAddress = "0x862D348383AE8DbcEd4BF2E703815E97D0909FEb";
    const lottery = await hre.ethers.getContractAt("ILottery", lotteryAddress, owner);
    await lottery.end();

    const winner = await lottery.getWinner();
    console.log(`Winner: ${winner}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
