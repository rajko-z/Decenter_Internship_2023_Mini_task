import LotteryFactory from "./build/ILotteryFactory.json";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

export const lotteryFactoryContractAddress =  '0xa85EffB2658CFd81e0B1AaD4f2364CdBCd89F3a1'

export const LotteryFactoryContract = new web3.eth.Contract(
    LotteryFactory.abi,
    lotteryFactoryContractAddress
);