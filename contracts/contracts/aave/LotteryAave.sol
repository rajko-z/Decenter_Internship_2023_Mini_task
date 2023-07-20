// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/ILottery.sol";
import "../interfaces/IPoolAddressesProvider.sol";
import "../interfaces/IERC20.sol";
import "../interfaces/IPool.sol";
import "./AaveV3Addresses.sol";

contract LotteryAave is ILottery, AaveV3Addresses {

    uint public constant minDurationInDays = 10;
    uint public constant freezeTimeInDaysBeforeWinnerReveal = 3;

    string private name;
    uint private tvl;
    uint private totalYield;
    uint private endDate;
    uint private minAmountToDeposit;
    address private winner;
    mapping(address => uint) private balances;
    IERC20 private token;
    IPool private pool;

    constructor(
        string memory _name,
        address _tokenAddress,
        uint _minAmountToDeposit,
        uint _amountToDeposit,
        uint _durationInDays
    ) {
        address poolAddress = IPoolAddressesProvider(POOL_ADDRESS_PROVIDER_MAINNET).getPool();
        pool = IPool(poolAddress);
        token = IERC20(_tokenAddress);

        require(_durationInDays >= minDurationInDays, "Lottery duration to short");
        require(_amountToDeposit >= _minAmountToDeposit, "Amount lesser than min amount to deposit");
        require(token.transferFrom(msg.sender, address(this), _amountToDeposit), "Transfer failed");

        token.approve(address(pool), _amountToDeposit);
        pool.supply(address(token), _amountToDeposit, address(this), 0);

        name = _name;
        tvl = _amountToDeposit;
        minAmountToDeposit = _minAmountToDeposit;
        endDate = block.timestamp + _durationInDays * 1 days;
        balances[msg.sender] += _amountToDeposit;
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

        emit DepositEvent(msg.sender, amount, tvl, balances[msg.sender]);
    }

    function withdraw() external {
        uint balance = balances[msg.sender];
        require(balance > 0, "No funds to withdraw");

        bool isWinner = winner == msg.sender;
        if (isWinner) {
            require(token.transfer(winner, totalYield), "Transfer of yield failed");
        }

        pool.withdraw(address(token), balance, msg.sender);
        balances[msg.sender] = 0;
        tvl -= balance;

        emit WithdrawEvent(msg.sender, balance, tvl, isWinner);
    }

    function end() external {
        require(block.timestamp >= endDate, "End date not reached");

        winner = _chooseWinner();

        pool.withdraw(address(token), type(uint256).max, address(this));
        totalYield = address(this).balance - tvl;

        token.approve(address(pool), tvl);
        pool.supply(address(token), tvl, address(this), 0);
    }

    function getName() external view returns (string memory) {return name;}

    function getTvl() external view returns (uint) {return tvl;}

    function getEndDate() external view returns (uint) {return endDate;}

    function getMinAmountToDeposit() external view returns (uint) {return minAmountToDeposit;}

    function getTotalYield() external view returns (uint) {return totalYield;}

    function getWinner() external view returns (address) {return winner;}

    function getProtocolId() external pure returns(uint) { return 1; }

    function getToken() external view returns(address) { return address(token); }

    function balanceOf(address _address) external view returns (uint) {
        return balances[_address];
    }

    function isFinished() external view returns (bool) {
        return winner != address(0);
    }

    function _chooseWinner() private returns (address) {
        // mock for now
        return address(0);
    }
}
