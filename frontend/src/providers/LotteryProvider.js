// calls to the SC
import { getTokenPrice } from './OracleProvider.js'
const backendEndpoint = "http://localhost:5000"

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

export const getAllActiveLotteries = async () => {

    try {
        await updateTokenPrices()
        console.log(tokenUSDPrices['DAI'])
        const res = [ {'lotteryName': 'name', 'protocol': 'Aave', 'tokenName': 'DAI', 'currentAmount': 600, 'expectedYield': 5, 'APY': 3, 'endDate': 'datum'}, {'lotteryName': 'name2', 'protocol': 'Aave', 'tokenName': 'USDC', 'currentAmount': 400, 'expectedYield': 5, 'APY': 3, 'endDate': 'datum'} ]  

        const updatedRes = res.map((obj) => {
            const { currentAmount, tokenName } = obj;
            const currentAmountUSD = currentAmount * tokenUSDPrices[tokenName];
            return { ...obj, currentAmountUSD };
        });

        console.log("updatedRes", updatedRes)
        return updatedRes
    } catch {
        console.error("Error fetching all active lotteries");
        return null;
    }
}

export const getMyLotteries = async (wallet) => {

    try {

    } catch {
        console.error("Error fetching users active lotteries");
        return null;
    }
}

export const createLottery = async () => {

    try {

    } catch {
        console.log("Error depositing money")
        return null
    }
}

export const depositMoney = async () => {

    try {

    } catch {
        console.log("Error depositing money")
        return null
    }
}

export const withdrawMoney = async () => {

    try {

    } catch {
        console.log("Error depositing money")
        return null
    }
}

export const claimMoney = async () => {

    try {
        
    } catch {
        console.log("Error depositing money")
        return null
    }
}