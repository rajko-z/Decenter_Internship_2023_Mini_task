import Lottery from "./build/ILottery.json";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

const lotteryContract = (address) => {
    return new web3.eth.Contract(
        Lottery.abi,
        address
    );
};

export default lotteryContract;