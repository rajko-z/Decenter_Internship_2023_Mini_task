// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/ILottery.sol";
import "../interfaces/IPoolAddressesProvider.sol";
import "../interfaces/IERC20.sol";
import "../interfaces/IPool.sol";
import "./AaveV3Addresses.sol";
import "../LotteryTree.sol";

contract LotteryAave is ILottery, AaveV3Addresses, LotteryTree {

    uint public constant freezeTimeInDaysBeforeWinnerReveal = 3;

    string private name;
    uint private tvl;
    uint private totalYield;
    uint private endDate;
    uint private totalDuration;
    uint private minAmountToDeposit;
    address private admin;
    address private winner;
    bool private winnerGotYield;
    bool private initialized;
    bool private locked;
    mapping(address => uint) private balances;
    mapping(address => uint) private addressToIndex;
    mapping(uint => address) private indexToAddress;
    IERC20 private token;
    IERC20 private aToken;
    IPool private pool;

    function init(
        string memory _name,
        address _tokenAddress,
        address _aTokenAddress,
        uint _minAmountToDeposit,
        uint _durationInDays,
        address _admin
    )
    public
    {
        require(!initialized, "Already initialized");

        address poolAddress = IPoolAddressesProvider(POOL_ADDRESS_PROVIDER_MAINNET).getPool();
        pool = IPool(poolAddress);
        token = IERC20(_tokenAddress);
        aToken = IERC20(_aTokenAddress);

        name = _name;
        minAmountToDeposit = _minAmountToDeposit;
        endDate = block.timestamp + _durationInDays * 1 days;
        totalDuration = _durationInDays * 1 days;
        admin = _admin;
        initialized = true;
        tree = [new int[](1)];
        holes = new uint[](0);
    }

    function deposit(uint _amount) external {
        uint endTimeForDeposit = endDate - freezeTimeInDaysBeforeWinnerReveal * 1 days;

        require(block.timestamp <= endTimeForDeposit, "The deposit time has expired");
        require(_amount >= minAmountToDeposit, "Amount lesser than min amount");
        require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

        bool alreadyMember = (balances[msg.sender] != 0);
        balances[msg.sender] += _amount;
        tvl += _amount;

        uint value = _amount * (endDate - block.timestamp) / totalDuration;

        if(alreadyMember) {
            treeAdd(int(value), addressToIndex[msg.sender]);
        } else {
            uint index = treeInsert(int(value));
            addressToIndex[msg.sender] = index;
            indexToAddress[index] = msg.sender;
        }

        token.approve(address(pool), _amount);
        pool.supply(address(token), _amount, address(this), 0);

        emit DepositEvent(msg.sender, _amount, tvl, balances[msg.sender]);
    }

    modifier noReentrancy() {
        require(!locked, "No reentrancy");
        locked = true;
        _;
        locked = false;
    }

    function withdraw() external noReentrancy {
        uint balance = balances[msg.sender];
        require(balance > 0, "No funds to withdraw");

        bool isWinner = (winner == msg.sender);
        if (isWinner && !winnerGotYield) {
            winnerGotYield = true;
            pool.withdraw(address(token), totalYield, msg.sender);
        }

        balances[msg.sender] = 0;
        tvl -= balance;

        uint index = addressToIndex[msg.sender];
        addressToIndex[msg.sender] = 0;
        indexToAddress[index] = address(0);
        treeRemove(index);

        pool.withdraw(address(token), balance, msg.sender);

        emit WithdrawEvent(msg.sender, balance, tvl, isWinner);
    }

    function end() external {
        require(block.timestamp >= endDate, "End date not reached");
        require(winner == address(0), "Lottery already finished");

        // everyone left the lottery, admin can take leftover yield
        if(tvl == 0) {
            winner = admin;
            uint amount = aToken.balanceOf(address(this));
            totalYield = amount;
            pool.withdraw(address(token), amount, admin);
            emit EndedEvent(winner, amount);
            return;
        }

        uint roll = getRandomNumber();
        uint winnerIndex = treeGetWinnerIndex(roll);
        winner = indexToAddress[winnerIndex];
        totalYield = aToken.balanceOf(address(this)) - tvl;

        emit EndedEvent(winner, totalYield);
    }

     function withdrawAdmin() external {
         require(winner != address(0), "Lottery not finished");
         require(msg.sender == admin, "Only admin can call");

         if (winnerGotYield) {
             uint amount = aToken.balanceOf(address(this)) - tvl;
             pool.withdraw(address(token), amount, admin);
         } else {
             uint amount = aToken.balanceOf(address(this)) - tvl - totalYield;
             pool.withdraw(address(token), amount, admin);
         }
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

    function getRandomNumber() private view returns (uint) {
        // mock for now
        uint lotterySum = treeSum();
        uint rnd = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, uint(42))));
        return rnd % lotterySum;
    }
}
