// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/ILottery.sol";
import "../interfaces/IPoolAddressesProvider.sol";
import "../interfaces/IERC20.sol";
import "../interfaces/IPool.sol";
import "./AaveV3Addresses.sol";
import "../LotteryTree.sol";

contract LotteryAave is ILottery, AaveV3Addresses, LotteryTree {

    uint public constant minDurationInDays = 10;
    uint public constant freezeTimeInDaysBeforeWinnerReveal = 3;

    string private name;
    uint private tvl;
    uint private totalYield;
    uint private endDate;
    uint private totalDuration;
    uint private minAmountToDeposit;
    address private winner;
    mapping(address => uint) private balances;
    mapping(address => uint) private addressToIndex;
    mapping(uint => address) private indextoAddress;
    IERC20 private token;
    IERC20 private aToken;
    IPool private pool;

    constructor(
        string memory _name,
        address _tokenAddress,
        address _aTokenAddress,
        uint _minAmountToDeposit,
        uint _durationInDays
    ) {
        address poolAddress = IPoolAddressesProvider(POOL_ADDRESS_PROVIDER_MAINNET).getPool();
        pool = IPool(poolAddress);
        token = IERC20(_tokenAddress);
        aToken = IERC20(_aTokenAddress);

        require(_durationInDays >= minDurationInDays, "Lottery duration to short");

        name = _name;
        minAmountToDeposit = _minAmountToDeposit;
        endDate = block.timestamp + _durationInDays * 1 days;
        totalDuration = _durationInDays * 1 days;
    }

    function deposit(uint amount) external {
        uint endTimeForDeposit = endDate - freezeTimeInDaysBeforeWinnerReveal * 1 days;

        require(block.timestamp <= endTimeForDeposit, "The deposit time has expired");
        require(amount >= minAmountToDeposit, "Amount lesser than min amount");
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        token.approve(address(pool), amount);
        pool.supply(address(token), amount, address(this), 0);
        tvl += amount;
        balances[msg.sender] += amount;

        uint value = amount * (endDate - block.timestamp) / totalDuration;
        uint index = treeAdd(int(value));
        addressToIndex[msg.sender] = index;
        indextoAddress[index] = msg.sender;

        emit DepositEvent(msg.sender, amount, tvl, balances[msg.sender]);
    }

    function withdraw() external {
        uint balance = balances[msg.sender];
        require(balance > 0, "No funds to withdraw");

        bool isWinner = (winner == msg.sender);
        if (isWinner) {
            require(token.transfer(winner, totalYield), "Transfer of yield failed");
        }

        pool.withdraw(address(token), balance, msg.sender);
        balances[msg.sender] = 0;
        tvl -= balance;

        uint index = addressToIndex[msg.sender];
        addressToIndex[msg.sender] = 0;
        indextoAddress[index] = address(0);
        treeRemove(index);

        emit WithdrawEvent(msg.sender, balance, tvl, isWinner);
    }

    function end() external {
        require(block.timestamp >= endDate, "End date not reached");

        int roll = getRandomNumber();
        uint winnerIndex = treeGetWinnerIndex(roll);
        winner = indextoAddress[winnerIndex];

        pool.withdraw(address(token), type(uint256).max, address(this));
        totalYield = address(this).balance - tvl;

        token.approve(address(pool), tvl);
        pool.supply(address(token), tvl, address(this), 0);

        emit EndedEvent(winner, totalYield);
    }

    function getName() external view returns (string memory) {return name;}

    function getTvl() external view returns (uint) {return tvl;}

    function getEndDate() external view returns (uint) {return endDate;}

    function getMinAmountToDeposit() external view returns (uint) {return minAmountToDeposit;}

    function getTotalYield() external view returns (uint) {return totalYield;}

    function getWinner() external view returns (address) {return winner;}

    function getProtocolId() external pure returns(uint) { return 1; }

    function getTokenAddress() external view returns(address) { return address(token); }

    function getCurrentYield() external view returns(uint) {
        return aToken.balanceOf(address(this)) - tvl;
    }

    function balanceOf(address _address) external view returns (uint) {
        return balances[_address];
    }

    function isFinished() external view returns (bool) {
        return winner != address(0);
    }

    function getRandomNumber() private view returns (int) {
        // mock for now
        int lotterySum = treeSum();
        int rnd = int(uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, uint(42)))));
        return rnd % lotterySum;
    }
}
