// calls to the SC
import { getTokenPrice } from './OracleProvider.js'
const backendEndpoint = "http://localhost:5000"

export const getAllActiveLotteries = async () => {

    try {

        const res = [ {'lotteryName': 'name', 'protocol': 'Aave', 'tokenName': 'DAI', 'currentAmount': 600, 'expectedYield': 5, 'APY': 3, 'endDate': 'datum'}, {'lotteryName': 'name2', 'protocol': 'Aave', 'tokenName': 'DAI', 'currentAmount': 600, 'expectedYield': 5, 'APY': 3, 'endDate': 'datum'} ]  
        const valueUSD = await getTokenPrice('DAI')
        res[0].currentAmountUSD = valueUSD * res[0].currentAmount
        res[1].currentAmountUSD = valueUSD * res[1].currentAmount
        return res

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