const hre = require("hardhat");
const fs = require('fs');
const {resolve, join} = require("path");

async function deployLotteryFactory() {
    const [owner, addr1, addr2] = await hre.ethers.getSigners();

    const AaveLotteryMain = await hre.ethers.getContractFactory("LotteryAave", owner);
    const aaveLotteryMain = await AaveLotteryMain.deploy();
    await aaveLotteryMain.waitForDeployment();
    const aaveLotteryMainAddress = await aaveLotteryMain.getAddress();

    const LotteryFactory = await hre.ethers.getContractFactory("LotteryFactory", owner);
    const lotteryFactory = await LotteryFactory.deploy(aaveLotteryMainAddress);
    await lotteryFactory.waitForDeployment();

    const addressContract = await lotteryFactory.getAddress();
    console.log("LotteryFactory address:" + addressContract);

    saveNewAddressToFile(addressContract);

    return lotteryFactory;
}

function saveNewAddressToFile(address) {
    const content =
`import LotteryFactory from "./build/ILotteryFactory.json";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

export const lotteryFactoryContractAddress =  '${address}'

export const LotteryFactoryContract = new web3.eth.Contract(
    LotteryFactory.abi,
    lotteryFactoryContractAddress
);`;

    const dirPath = resolve(__dirname, '../../frontend/src/ethereum');
    const filePath = join(dirPath, 'LotteryFactoryContract.js');

    try {
        fs.writeFileSync(filePath, content);
        console.log("File written successfully");
    } catch (error) {
        console.error(`Error writing file: ${error}`);
    }
}

module.exports = { deployLotteryFactory };
