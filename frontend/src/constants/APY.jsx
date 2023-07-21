import Web3 from 'web3'
const web3 = new Web3(window.ethereum);

export const markets = {
    "Aave V3": {
        marketAddress: '0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e',
        apyContractAddress: '0xf4B715BB788cC4071061bd67dC8B56681460A2fF',
        apyContractABI: [{"inputs":[{"internalType":"address","name":"_market","type":"address"},{"internalType":"address","name":"_tokenAddr","type":"address"}],"name":"getTokenInfoFull","outputs":[{"components":[{"internalType":"address","name":"aTokenAddress","type":"address"},{"internalType":"address","name":"underlyingTokenAddress","type":"address"},{"internalType":"uint16","name":"assetId","type":"uint16"},{"internalType":"uint256","name":"supplyRate","type":"uint256"},{"internalType":"uint256","name":"borrowRateVariable","type":"uint256"},{"internalType":"uint256","name":"borrowRateStable","type":"uint256"},{"internalType":"uint256","name":"totalSupply","type":"uint256"},{"internalType":"uint256","name":"availableLiquidity","type":"uint256"},{"internalType":"uint256","name":"totalBorrow","type":"uint256"},{"internalType":"uint256","name":"totalBorrowVar","type":"uint256"},{"internalType":"uint256","name":"totalBorrowStab","type":"uint256"},{"internalType":"uint256","name":"collateralFactor","type":"uint256"},{"internalType":"uint256","name":"liquidationRatio","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"supplyCap","type":"uint256"},{"internalType":"uint256","name":"borrowCap","type":"uint256"},{"internalType":"uint256","name":"emodeCategory","type":"uint256"},{"internalType":"uint256","name":"debtCeilingForIsolationMode","type":"uint256"},{"internalType":"uint256","name":"isolationModeTotalDebt","type":"uint256"},{"internalType":"bool","name":"usageAsCollateralEnabled","type":"bool"},{"internalType":"bool","name":"borrowingEnabled","type":"bool"},{"internalType":"bool","name":"stableBorrowRateEnabled","type":"bool"},{"internalType":"bool","name":"isolationModeBorrowingEnabled","type":"bool"},{"internalType":"bool","name":"isSiloedForBorrowing","type":"bool"},{"internalType":"uint256","name":"eModeCollateralFactor","type":"uint256"},{"internalType":"bool","name":"isFlashLoanEnabled","type":"bool"},{"internalType":"uint16","name":"ltv","type":"uint16"},{"internalType":"uint16","name":"liquidationThreshold","type":"uint16"},{"internalType":"uint16","name":"liquidationBonus","type":"uint16"},{"internalType":"address","name":"priceSource","type":"address"},{"internalType":"string","name":"label","type":"string"}],"internalType":"struct AaveV3View.TokenInfoFull","name":"_tokenInfo","type":"tuple"}],"stateMutability":"view","type":"function"}]
    }
}
