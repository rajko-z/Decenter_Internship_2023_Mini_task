

// first call deployLotteryFactory.js i uzmi vrednost
const FACTORY_ADDRESS = "0x9155497EAE31D432C0b13dBCc0615a37f55a2c87";


const hre = require("hardhat");

async function main() {
    await hre.run("compile");

    const [owner, addr1, addr2] = await hre.ethers.getSigners();
    const userAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const signer = await hre.ethers.getSigner(userAddress);

    const lotteryFactory = await hre.ethers.getContractAt("LotteryFactory", FACTORY_ADDRESS);
    console.log(await lotteryFactory.getAddress());

    const lotteries = await lotteryFactory.connect(signer).getLotteries(true);
    console.log(lotteries[0][0]);
    console.log(lotteries[1][0]);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
