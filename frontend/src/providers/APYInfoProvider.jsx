import Web3 from 'web3'
import { markets } from '../constants/APY';
import { tokenToInfo } from '../constants/Tokens';
import { tokenUSDPrices } from './LotteryProvider';

const web3 = new Web3(window.ethereum);

export const fetchAPY = async (protocol, tokenSymbol) => {

    const tokenContractAddr = tokenToInfo[tokenSymbol].address

    try {
        const apyContract = new web3.eth.Contract(markets[protocol].apyContractABI, markets[protocol].apyContractAddress)
        const result = await apyContract.methods.getTokenInfoFull(markets[protocol].marketAddress, tokenContractAddr).call()        
        return result.supplyRate
    } catch {
        console.error("Error fetching APY");
        return null;
    }
}

export const getExpectedPrice = async (protocol, tokenSymbol, tvlUSD, currentYieldUSD, endDate) => {
    const resultAPY = await fetchAPY(protocol, tokenSymbol) / 10**25;

    function dateDifference(date1, date2) {
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
        const differenceInDays = (date2.getTime() - date1.getTime()) / oneDayInMilliseconds;
        return differenceInDays;
    }
    const expectedPrize = currentYieldUSD + tvlUSD * (1 + (resultAPY * dateDifference(new Date(), new Date(endDate * 1000)) / 365) / 100);
    //console.log('exp', (resultAPY * dateDifference(new Date(), new Date(endDate * 1000)) / 365))
    return expectedPrize;
}