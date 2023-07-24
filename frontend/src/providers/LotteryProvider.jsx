// calls to the SC
import { getTokenPrice, weiToToken, tokenToWei } from './OracleProvider'
import { protocolToId, idToProtocol, infoToToken, tokenToInfo, ERC20Info } from '../constants/Tokens'
import { lotteryFactoryContractAddress, LotteryFactoryContract } from "../ethereum/LotteryFactoryContract";
import LotteryContract from "../ethereum/LotteryContract";

import Web3 from 'web3'
const web3 = new Web3(window.ethereum);

export const tokenUSDPrices = {
    'DAI': 0,
    'USDC': 0,
    'wETH': 0,
}

// Get Oracle prices for the supported tokens
export const updateTokenPrices = async () => {
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
        const res = await LotteryFactoryContract.methods.getLotteries(false).call({});

        console.log("All Lotteries", res)

        // const res = [{'contractAddress': '0xaddr1', 'name': 'lottery1', 'protocolId': 1, 'tokenAddress': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 'tvl': 10000000000, 
        //               'endDate': 1689849999, 'minAmountToDeposit': 10000000000, 'currentYield': 80000000000, 'winner': '0xWINNER1', 'myAmount': 30000000000},
        //               {'contractAddress': '0xaddr1', 'name': 'lottery1', 'protocolId': 1, 'tokenAddress': '0x6B175474E89094C44Da98b954EedeAC495271d0F', 'tvl': 100000000000000000000, 
        //               'endDate': 1689849999, 'minAmountToDeposit': 1000000000000000000, 'currentYield': 80000000000000000000, 'winner': '0x0', 'myAmount': 30000000000000000000}]
        
        const updatedRes = res.map((obj) => {
            return(expandLottery(obj))
        });

        return updatedRes
    } catch {
        console.error("Error fetching all active lotteries");
        return null;
    }
}

export const getUserLotteries = async (wallet) => {
    
    try {

        await updateTokenPrices()
        const res = await LotteryFactoryContract.methods.getLotteries(true).call({from: wallet}).catch((error) => {     
            console.log("error user lotteries", error)
        });
        
        console.log("User Lotteries", res)

        const updatedRes = res.map((obj) => {
            return(expandLottery(obj))
        })

        return updatedRes
    } catch {
        console.error("Error fetching users active lotteries");
        return null
    }
}

export const getLotteryByAddress = async (contractAddress) => {

    try {

        const res = await LotteryFactoryContract.methods.getLotteryByAddress(contractAddress).call().catch((error) => {
            console.log("error fetching lottery by address", error)
        })

        await updateTokenPrices()
        return expandLottery(res)

    } catch (error) {
        console.log("Error fetching lottery by address", error)
        return null
    }
}

export const createLottery = async (wallet, name, protocol, tokenSymbol, minAmountToDeposit, depositAmount, durationInDays) => {

    const protocolId = protocolToId[protocol]
    const tokenAddress = tokenToInfo[tokenSymbol].address
    durationInDays = Math.floor(durationInDays)

    // convert token values (DAI, USDC) to wei
    minAmountToDeposit = tokenToWei(minAmountToDeposit, tokenToInfo[tokenSymbol].decimals)
    depositAmount = tokenToWei(depositAmount, tokenToInfo[tokenSymbol].decimals)

    try {

        await LotteryFactoryContract.methods.createLottery(name, protocolId.toString(), tokenAddress, minAmountToDeposit.toString(), durationInDays.toString()).send({from: wallet})
        .on('transactionHash', function(hash){
            console.log("hash", hash)
        })

    } catch (error) {
        console.error("Error creating lottery", error)
        return null
    }
}

// TO-DO: show if tx is reverted/passed
export const depositMoneyInLottery = async (wallet, contractAddress, amount, tokenSymbol, minAmountToDeposit) => {
    if (amount < minAmountToDeposit) {
        alert("You need to output more than: " + minAmountToDeposit + " " + tokenSymbol)
        return false
    }
    // amount is in token (USDC, DAI) -> convert to wei
    const amountWei = tokenToWei(amount, tokenToInfo[tokenSymbol].decimals)

    try {
        // Check User Balance
        const myBalance = await web3.eth.getBalance(wallet)
        if (myBalance < amount) {
            alert("Insufficient funds")
            return false
        }
        
        handleApprove(contractAddress, wallet, tokenSymbol, amountWei)

        const contract = LotteryContract(contractAddress);
        await contract.methods.deposit(amountWei.toString()).send({from: wallet})

        return true
            
    } catch (error) {
        console.log(error)
        console.log("Error depositing money")
        return false
    }
}

// for withdraw and claim (logic is on solidity)
export const withdrawMoneyFromLottery = async (wallet, contractAddress) => {

    try {
        const contract = LotteryContract(contractAddress);
        await contract.methods.withdraw().send({from: wallet})
        return true
    } catch (error) {
        alert(error)
        console.log("Error withdrawing money", error)
        return false
    }
}

export const getLotteryReward = async (contractAddress, tokenSymbol) => {

    const contract = LotteryContract(contractAddress);
    const res = await contract.methods.getTotalYield().call()           // returns in wei

    return weiToToken(res, tokenToInfo[tokenSymbol].decimals)
}

const handleApprove = async (contractAddress, wallet, tokenSymbol, amountWei) => {

    const ERC20Contract = new web3.eth.Contract(ERC20Info.ABI, ERC20Info.address)
    const hasAllowance = await ERC20Contract.methods.allowance(contractAddress, wallet).call()

    if (!hasAllowance){
        const tokenContract = new web3.eth.Contract(ERC20Info.ABI, tokenToInfo[tokenSymbol].address)
        await tokenContract.methods.approve(contractAddress, amountWei.toString()).send({from: wallet}).catch((error) => {   
            alert("Error approving contract to transfer money") 
            console.log(error)
        })
    }
}

const expandLottery = (obj) => {

    // Return the object as-is if it's not valid
    if (!obj || !obj.tokenAddress || !obj.protocolId) {
        return obj; 
    }

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
}