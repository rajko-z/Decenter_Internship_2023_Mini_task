const networkConfig = {
    31337: {
        name: "hardhat",
        wethToken: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        aWethToken: "0x4d5F47FA6A74757f35C14fD3a6Ef8E3C9BC514E8",
        daiToken: "0x6b175474e89094c44da98b954eedeac495271d0f",
        poolAddressProvider: "0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e",
        linkToken: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
        vrfV2Wrapper: "0x5A861794B927983406fCE1D062e00b9368d97Df6",
    },
    11155111: {
        linkTokenSepolia: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
        vrfV2WrapperSepolia: "0xab18414CD93297B0d12ac29E63Ca20f515b3DB46"
    }
}

module.exports = {
    networkConfig,
}