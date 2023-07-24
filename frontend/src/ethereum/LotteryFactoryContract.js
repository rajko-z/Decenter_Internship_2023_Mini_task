import LotteryFactory from "./build/ILotteryFactory.json";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

export const lotteryFactoryContractAddress =  '0xfB12F7170FF298CDed84C793dAb9aBBEcc01E798'

export const LotteryFactoryContract = new web3.eth.Contract(
    LotteryFactory.abi,
    lotteryFactoryContractAddress
);