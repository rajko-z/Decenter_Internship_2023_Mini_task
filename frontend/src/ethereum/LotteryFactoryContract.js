import LotteryFactory from "./build/ILotteryFactory.json";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

const instance = new web3.eth.Contract(
    LotteryFactory.abi,
    '0x9155497EAE31D432C0b13dBCc0615a37f55a2c87'
);

export default instance;