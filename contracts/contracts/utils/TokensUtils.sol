// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokensUtils {

    mapping(address => uint) public tokens;
    address private owner;

    address internal constant DAI_MAINNET_ADDRESS = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address internal constant USDC_MAINNET_ADDRESS = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    address internal constant WETH_MAINNET_ADDRESS = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    address internal constant DAI_SEPOLIA_ADDRESS = 0x53844F9577C2334e541Aec7Df7174ECe5dF1fCf0;
    address internal constant USDC_SEPOLIA_ADDRESS = 0x8267cF9254734C6Eb452a7bb9AAF97B392258b21;
    address internal constant WETH_SEPOLIA_ADDRESS = 0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9;

    uint internal constant DAI_MIN_VALUE_TO_DEPOSIT = 100;
    uint internal constant USDC_MIN_VALUE_TO_DEPOSIT = 100;
    uint internal constant WETH_MIN_VALUE_TO_DEPOSIT = 100;

    constructor() {
        owner = msg.sender;
        tokens[DAI_MAINNET_ADDRESS] = DAI_MIN_VALUE_TO_DEPOSIT;
        tokens[USDC_MAINNET_ADDRESS] = USDC_MIN_VALUE_TO_DEPOSIT;
        tokens[WETH_MAINNET_ADDRESS] = WETH_MIN_VALUE_TO_DEPOSIT;

        tokens[DAI_SEPOLIA_ADDRESS] = DAI_MIN_VALUE_TO_DEPOSIT;
        tokens[USDC_SEPOLIA_ADDRESS] = USDC_MIN_VALUE_TO_DEPOSIT;
        tokens[WETH_SEPOLIA_ADDRESS] = WETH_MIN_VALUE_TO_DEPOSIT;
    }

    function addToken(address tokenAddress, uint minAmount) public {
        require(msg.sender == owner, "Only owner can call");
        require(tokens[tokenAddress] == 0, "Token already present");
        require(minAmount > 0, "Amount should be positive");
        tokens[tokenAddress] = minAmount;
    }

    function changeToken(address tokenAddress, uint newAmount) public {
        require(msg.sender == owner, "Only owner can call");
        require(tokens[tokenAddress] != 0, "Token is not present");
        require(newAmount > 0, "Amount should be positive");
        tokens[tokenAddress] = newAmount;
    }

    function removeToken(address tokenAddress) public {
        require(msg.sender == owner, "Only owner can call");
        require(tokens[tokenAddress] != 0, "Token is not present");
        tokens[tokenAddress] = 0;
    }

    function tokenSupported(address tokenAddress) view public returns (bool) {
        return tokens[tokenAddress] != 0;
    }

    function tokenMinAmount(address tokenAddress) view public returns (uint) {
        return tokens[tokenAddress];
    }
}
