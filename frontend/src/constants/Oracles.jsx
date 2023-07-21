//chainlink oracles: https://data.chain.link/
//network/chain id: 1 (mainnet)

import Web3 from 'web3'
const web3 = new Web3(window.ethereum);

const ethMainnetOracles = {
    'DAI' : {
        'ABI': [{"inputs":[],"name":"latestAnswer","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}],
        '1' : {
            'contract': '0xaed0c38402a5d19df6e4c03f4e2dced6e29c1ee9'
        }
    },
    'USDC' : {
        'ABI': [{"inputs":[],"name":"latestAnswer","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}],
        '1' : {
            'contract': '0x8fffffd4afb6115b954bd326cbe7b4ba576818f6'
        }
    },
    'wETH' : {
        'ABI': [{"inputs":[],"name":"latestAnswer","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"}],
        '1' : {
            'contract': '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419'
        }
    }
}

export const contractOracles = {
    'DAI' : new web3.eth.Contract(ethMainnetOracles['DAI']['ABI'], ethMainnetOracles['DAI']['1']['contract']),
    'USDC' : new web3.eth.Contract(ethMainnetOracles['USDC']['ABI'], ethMainnetOracles['USDC']['1']['contract']),
    'wETH' : new web3.eth.Contract(ethMainnetOracles['ETH']['ABI'], ethMainnetOracles['ETH']['1']['contract']),
}