// constants for tokens
// contract addresses are on the mainnet

export const idToProtocol = {
    1: 'Aave V3'
}

export const protocolToId = {
    'Aave V3': 1
}

export const infoToToken = {
    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': {
        symbol: 'USDC',
        decimals: 6
    },
    '0x6B175474E89094C44Da98b954EedeAC495271d0F': {
        symbol: 'DAI',
        decimals: 18
    }
}

export const tokenToInfo = {
    'USDC': {
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        decimals: 6
    },
    'DAI': {
        address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        decimals: 18
    }
}