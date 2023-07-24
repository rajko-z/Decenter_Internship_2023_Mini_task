import LotteryFactory from "./build/ILotteryFactory.json";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

export const lotteryFactoryContractAddress =  '0xfaE849108F2A63Abe3BaB17E21Be077d07e7a9A2'

export const LotteryFactoryContract = new web3.eth.Contract(
    LotteryFactory.abi,
    lotteryFactoryContractAddress
);