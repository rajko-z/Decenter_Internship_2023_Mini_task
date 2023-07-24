require("@nomicfoundation/hardhat-toolbox");
const {task} = require("hardhat/config");
const {time} = require("@nomicfoundation/hardhat-network-helpers");
require('dotenv').config({path:__dirname+'/.env'})

task("speedTime", "Speed time with X days")
    .addParam("days", "Number of days to speed")
    .setAction(async (taskArgs) => {
      const numberOfDays = taskArgs.days;
      const DAY = 3600 * 24;
      await time.increase(DAY * numberOfDays);
    });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.19"
      },
      {
        version: "0.8.0"
      },
      {
        version: "0.6.6",
      },
      {
        version: "0.4.19",
      },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 1
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      chainId: 11155111,
      url: process.env.SEPOLIA_URL,
      accounts:
          process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    },
    hardhat: {
      chainId: 31337,
      forking: {
        url: process.env.MAINNET_FORK,
      }
    },
    localhost: {
      chainId: 31337,
      url: "http://127.0.0.1:8545/"
    }
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY
    }
  }
};
