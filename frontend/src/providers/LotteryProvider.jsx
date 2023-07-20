// calls to the SC
import { getTokenPrice } from './OracleProvider'
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
        const res = [ {'id': 1, 'name': "name1", 'protocol': 'Aave', 'tokenName': 'DAI', 'currentAmount': 600, 'expectedYield': 5, 'APY': 3, 'endDate': '07.03.2026', 'winner': null}, {'id': 2, 'name': "name2", 'protocol': 'Aave', 'tokenName': 'USDC', 'currentAmount': 400, 'expectedYield': 5, 'APY': 3, 'endDate': '27.09.2023.', 'winner': '0x98b638822892fBAFd7F338780D50BAe8a3336C48'}]

        const updatedRes = res.map((obj) => {
            const { currentAmount, tokenName } = obj;
            const currentAmountUSD = currentAmount * tokenUSDPrices[tokenName];
            return { ...obj, currentAmountUSD };
        });

        return updatedRes
    } catch {
        console.error("Error fetching all active lotteries");
        return null;
    }
}

export const checkLotteryStatus = async (lotteryId) => {
    return true;
}

export const getMyLotteries = async (wallet) => {

    try {

    } catch {
        console.error("Error fetching users active lotteries");
        return null;
    }
}

export const createLottery = async (name, protocol, token, wallet, depositAmount, endDate) => {

    try {

    } catch {
        console.error("Error depositing money")
        return null
    }
}

export const depositMoney = async (lotteryId, amount, wallet) => {

    try {

    } catch {
        console.error("Error depositing money")
        return null
    }
}

export const withdrawMoney = async (lotteryId, wallet) => {

    try {

    } catch {
        console.error("Error depositing money")
        return null
    }
}

export const claimMoney = async (lotteryId, wallet) => {

    try {
        
    } catch {
        console.error("Error depositing money")
        return null
    }
}

export const getUsersMoneyInLottery = async (lotteryId, wallet) => {
       return 299;
}

export const getLotteryReward = async (lotteryId) => {
    return 1000;
}