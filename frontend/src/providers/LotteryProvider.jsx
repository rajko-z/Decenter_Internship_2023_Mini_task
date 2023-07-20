// calls to the SC
import { idToProtocol } from '../constants/Tokens'
import { getTokenPrice, weiToToken, tokenToWei } from './OracleProvider'
import { protocolToId, infoToToken, tokenToInfo } from '../constants/Tokens'

const tokenUSDPrices = {
    'DAI': 0,
    'USDC': 0
}

// Get Oracle prices for the supported tokens
const updateTokenPrices = async () => {
    const keys = Object.keys(tokenUSDPrices);
    const promises = keys.map(async (key) => {
      const price = await getTokenPrice(key);
      return { key, price };
    });
  
    const results = await Promise.all(promises);
    results.forEach(({ key, price }) => {
        tokenUSDPrices[key] = price;
    });
};

export const getAllLotteries = async () => {

    try {

        await updateTokenPrices()

        // USDC (tvl 100$, minAmount 1$, currYield 8$, myAmount 3$)
        const res = [{'contractAddress': '0xaddr1', 'name': 'lottery1', 'protocolId': 1, 'tokenAddress': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 'tvl': 100000000000000000000, 
                      'endDate': 1689849999, 'minAmountToDeposit': 1000000000000000000, 'currentYield': 80000000000000000000, 'winner': '0xWINNER1', 'myAmount': 30000000000000000000},
                      {'contractAddress': '0xaddr1', 'name': 'lottery1', 'protocolId': 1, 'tokenAddress': '0x6B175474E89094C44Da98b954EedeAC495271d0F', 'tvl': 100000000000000000000, 
                      'endDate': 1689849999, 'minAmountToDeposit': 1000000000000000000, 'currentYield': 80000000000000000000, 'winner': '0x0', 'myAmount': 30000000000000000000}]
        
        const updatedRes = res.map((obj) => {
            const tokenSymbol = infoToToken[obj.tokenAddress].symbol
            const tokenDecimals = infoToToken[obj.tokenAddress].decimals

            // calculate new values expressed in token values like USDC, DAI (wei -> ERC20)
            const { tvl, minAmountToDeposit, currentYield, myAmount } = obj
            const newTvl = weiToToken(tvl, tokenDecimals)
            const newMinAmountToDeposit = weiToToken(minAmountToDeposit, tokenDecimals)
            const newCurrentYield = weiToToken(currentYield, tokenDecimals)
            const newMyAmount = weiToToken(myAmount, tokenDecimals)

            // calculate new values expressed in USD
            const tvlUSD = newTvl * tokenUSDPrices[tokenSymbol]
            const minAmountToDepositUSD = newMinAmountToDeposit * tokenUSDPrices[tokenSymbol]
            const currentYieldUSD = newCurrentYield * tokenUSDPrices[tokenSymbol]
            const myAmountUSD = newMyAmount * tokenUSDPrices[tokenSymbol]

            const protocol = idToProtocol[obj.protocolId]

            return {
                ...obj,
                tvl: newTvl,
                minAmountToDeposit: newMinAmountToDeposit,
                currentYield: newCurrentYield,
                myAmount: newMyAmount,
                protocol,
                tokenSymbol,
                tvlUSD,
                minAmountToDepositUSD,
                currentYieldUSD,
                myAmountUSD
            }
        });

        return updatedRes
    } catch {
        console.error("Error fetching all active lotteries");
        return null;
    }
}

export const getUserLotteries = async (wallet) => {

    try {

    } catch {
        console.error("Error fetching users active lotteries");
        return null;
    }
}

export const createLottery = async (wallet, name, protocol, tokenSymbol, minAmountToDeposit, depositAmount, durationInDays) => {

    const protocolId = protocolToId[protocol]
    const tokenAddress = tokenToInfo[tokenSymbol]

    // convert token values (DAI, USDC) to wei
    minAmountToDeposit = tokenToWei(minAmountToDeposit, tokenToInfo[tokenSymbol].decimals)
    depositAmount = tokenToWei(depositAmount, tokenToInfo[tokenSymbol].decimals)

    try {


    } catch {
        console.error("Error depositing money")
        return null
    }
}

export const depositMoneyInLottery = async (wallet, contractAddress, amount, tokenSymbol) => {

    // from: wallet
    // sending to contract contractAddress
    // amount is in token (USDC, DAI) -> convert to wei
    amount = tokenToWei(amount, tokenToInfo[tokenSymbol].decimals)

    try {

    } catch {
        console.error("Error depositing money")
        return null
    }
}

// for withdraw and claim (logic is on solidity)
export const withdrawMoneyFromLottery = async (wallet, contractAddress) => {

    // from: wallet
    // sending to contract contractAddress

    try {

    } catch {
        console.error("Error depositing money")
        return null
    }
}

export const getLotteryReward = async (contractAddress) => {

    // pozivamo funckiju getTotalYield()

    return 1000;
}