import Lottery from "./build/ILottery.json";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

export default (address) => {
    return new web3.eth.Contract(
        Lottery.abi,
        address
    );
};