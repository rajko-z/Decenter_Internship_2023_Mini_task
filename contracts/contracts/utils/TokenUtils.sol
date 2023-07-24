// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenUtils is Ownable {

    mapping(address => uint) public tokens;
    mapping(address => address) public tokenToAtoken;

    address internal constant DAI_MAINNET_ADDRESS = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address internal constant USDC_MAINNET_ADDRESS = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    address internal constant WETH_MAINNET_ADDRESS = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    address internal constant aDAI_MAINNET_ADDRESS = 0x018008bfb33d285247A21d44E50697654f754e63;
    address internal constant aUSDC_MAINNET_ADDRESS = 0x98C23E9d8f34FEFb1B7BD6a91B7FF122F4e16F5c;
    address internal constant aWETH_MAINNET_ADDRESS = 0x4d5F47FA6A74757f35C14fD3a6Ef8E3C9BC514E8;

    uint internal constant DAI_MIN_VALUE_TO_DEPOSIT = 100;
    uint internal constant USDC_MIN_VALUE_TO_DEPOSIT = 100;
    uint internal constant WETH_MIN_VALUE_TO_DEPOSIT = 100;

    constructor() {
        tokens[DAI_MAINNET_ADDRESS] = DAI_MIN_VALUE_TO_DEPOSIT;
        tokens[USDC_MAINNET_ADDRESS] = USDC_MIN_VALUE_TO_DEPOSIT;
        tokens[WETH_MAINNET_ADDRESS] = WETH_MIN_VALUE_TO_DEPOSIT;

        tokenToAtoken[DAI_MAINNET_ADDRESS] = aDAI_MAINNET_ADDRESS;
        tokenToAtoken[USDC_MAINNET_ADDRESS] = aUSDC_MAINNET_ADDRESS;
        tokenToAtoken[WETH_MAINNET_ADDRESS] = aWETH_MAINNET_ADDRESS;
    }

    function addToken(address tokenAddress, address aTokenAddress, uint minAmount) public onlyOwner {
        require(tokens[tokenAddress] == 0, "Token already present");
        require(minAmount > 0, "Amount should be positive");
        tokens[tokenAddress] = minAmount;
        tokenToAtoken[tokenAddress] = aTokenAddress;
    }

    function changeTokenMinAmount(address tokenAddress, uint newAmount) public onlyOwner {
        require(tokens[tokenAddress] != 0, "Token is not present");
        require(newAmount > 0, "Amount should be positive");
        tokens[tokenAddress] = newAmount;
    }

    function removeToken(address tokenAddress) public onlyOwner {
        require(tokens[tokenAddress] != 0, "Token is not present");
        tokens[tokenAddress] = 0;
        tokenToAtoken[tokenAddress] = address(0);
    }

    function tokenSupported(address tokenAddress) public view returns (bool) {
        return tokens[tokenAddress] != 0;
    }

    function tokenMinAmount(address tokenAddress) public view returns (uint) {
        return tokens[tokenAddress];
    }
}
