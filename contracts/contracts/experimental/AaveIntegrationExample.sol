// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "../interfaces/IPoolAddressesProvider.sol";
import "../interfaces/IERC20.sol";
import "../interfaces/IPool.sol";

contract AaveIntegrationExample {

    IPool private pool;
    IERC20 private token;
    uint256 public tlv;

    mapping (address => uint256) public balances;

    constructor(address _poolAddressProviderAddress, address _tokenAddress) {
        address poolAddress = IPoolAddressesProvider(_poolAddressProviderAddress).getPool();
        pool = IPool(poolAddress);
        token = IERC20(_tokenAddress);
    }

    // user has to call approve with amount to this contract address
    function deposit(uint256 amount) external {
        require(token.balanceOf(msg.sender) >= amount, "Not enough funds");
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        token.approve(address(pool), amount);
        pool.supply(address(token), amount, address(this), 0);
        balances[msg.sender] += amount;
        tlv += amount;
    }

    function withdraw() external returns(uint256) {
        uint256 balance = balances[msg.sender];
        require(balance != 0, "Can't find any funds to withdraw");
        uint256 aTokenValue = pool.withdraw(address(token), balance, msg.sender);
        balances[msg.sender] = 0;
        tlv -= balance;
        return aTokenValue;
    }
}
