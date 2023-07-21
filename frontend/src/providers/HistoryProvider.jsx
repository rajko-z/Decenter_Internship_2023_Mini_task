import { idToProtocol, infoToToken } from '../constants/Tokens'
import { weiToToken } from './OracleProvider'
import { updateTokenPrices, tokenUSDPrices } from './LotteryProvider'

const backendEndpoint = "http://localhost:8080/lotteries/history"

export const getHistory = async () => {

    try {
        // const response = await fetch(`${backendEndpoint}`);
        // const res = await response.json();

        const res = [{'contractAddress': '0xABC', 'name': 'lutrija5', 'protocolId': 1, 'tokenAddress': '0x6B175474E89094C44Da98b954EedeAC495271d0F', 'lastTVL': 100000000000000000000, 'yield': 0, 'endDate': 1689848249, 'winner': '0xWINNER1'},
                      {'contractAddress': '0xABC', 'name': 'lutrija6', 'protocolId': 1, 'tokenAddress': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 'lastTVL': 200000000, 'yield': 0, 'endDate': 1689848110, 'winner': '0xWINNER2'}]
        
        await updateTokenPrices()

        const updatedRes = res.map((obj) => {
            const protocol = idToProtocol[obj.protocolId]
            const tokenSymbol = infoToToken[obj.tokenAddress].symbol
            const tokenDecimals = infoToToken[obj.tokenAddress].decimals

            const newLastTVL = weiToToken(obj.lastTVL, tokenDecimals)
            const newYield = weiToToken(obj.yield, tokenDecimals)

            const lastTVLUSD = newLastTVL * tokenUSDPrices[tokenSymbol]
            const yieldUSD = newYield * tokenUSDPrices[tokenSymbol]

            return {
                ...obj,
                lastTVL: newLastTVL,
                yield: newYield,
                tokenSymbol,
                protocol,
                lastTVLUSD,
                yieldUSD
            }
        })

        return updatedRes

        } catch {
        console.error("Error fetching history");
        return null;
    }
}