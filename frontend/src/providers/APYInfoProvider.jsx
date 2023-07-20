import Web3 from 'web3'
import { markets } from '../constants/APY';
import { tokenToInfo } from '../constants/Tokens';

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
