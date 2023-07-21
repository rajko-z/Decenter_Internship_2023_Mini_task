require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({path:__dirname+'/.env'})

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
        runs: 1000,
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      chainId: 11155111,
      //url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      //accounts: [SEPOLIA_SECRET_KEY],
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
