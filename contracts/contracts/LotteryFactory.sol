// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/ILottery.sol";
import "./interfaces/ILotteryFactory.sol";
import "./aave/LotteryAave.sol";
import "./interfaces/IERC20.sol";

contract LotteryFactory is ILotteryFactory {

    ILottery[] public lotteries;

    ///////////////// PROTOCOL VARIABLES
    mapping(uint => bool) public protocols;
    address private owner;
    uint internal constant AAVE_ID = 1;
    ////////////////////////////////////

    ///////////////////// TOKENS VARIABLES
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
    //////////////////////////

    constructor() {
        owner = msg.sender;
        protocols[AAVE_ID] = true;

        tokens[DAI_MAINNET_ADDRESS] = DAI_MIN_VALUE_TO_DEPOSIT;
        tokens[USDC_MAINNET_ADDRESS] = USDC_MIN_VALUE_TO_DEPOSIT;
        tokens[WETH_MAINNET_ADDRESS] = WETH_MIN_VALUE_TO_DEPOSIT;

        tokenToAtoken[DAI_MAINNET_ADDRESS] = aDAI_MAINNET_ADDRESS;
        tokenToAtoken[USDC_MAINNET_ADDRESS] = aUSDC_MAINNET_ADDRESS;
        tokenToAtoken[WETH_MAINNET_ADDRESS] = aWETH_MAINNET_ADDRESS;
    }

    function createLottery(
        string memory _name,
        uint _protocolId,
        address _tokenAddress,
        uint _minAmountToDeposit,
        uint _durationInDays
    )
    external
    {
        require(tokenSupported(_tokenAddress), "Token not supported");
        require(_minAmountToDeposit >= tokenMinAmount(_tokenAddress), "Min amount not enough");
        require(protocolSupported(_protocolId), "Protocol not supported");

        ILottery newLottery;
        if (_protocolId == 1) {
            newLottery = new LotteryAave(_name, _tokenAddress, tokenToAtoken[_tokenAddress], _minAmountToDeposit, _durationInDays);
        }
        lotteries.push(newLottery);

        emit CreatedEvent(
            address(newLottery),
            msg.sender,
            _name,
            _protocolId,
            _tokenAddress,
            IERC20(_tokenAddress).symbol(),
            IERC20(_tokenAddress).decimals(),
            newLottery.getEndDate(),
            _minAmountToDeposit
        );
    }

    function getLotteries(bool filterByUser) external view returns (LotteryData[] memory) {
        LotteryData[] memory result = new LotteryData[](lotteries.length);
        uint count = 0;
        for (uint i = 0; i < lotteries.length; i++) {
            ILottery lottery = lotteries[i];

            if (filterByUser && lottery.balanceOf(msg.sender) == 0)
                continue;

            result[count] = LotteryData(
                {
                    contractAddress: address(lottery),
                    name: lottery.getName(),
                    protocolId: lottery.getProtocolId(),
                    tokenAddress: lottery.getTokenAddress(),
                    tokenSymbol: IERC20(lottery.getTokenAddress()).symbol(),
                    tokenDecimals: IERC20(lottery.getTokenAddress()).decimals(),
                    tvl: lottery.getTvl(),
                    endDate: lottery.getEndDate(),
                    minAmountToDeposit: lottery.getMinAmountToDeposit(),
                    currentYield: lottery.getCurrentYield(),
                    winner: lottery.getWinner(),
                    myAmount: lottery.balanceOf(msg.sender)
                }
            );
            count += 1;
        }
        LotteryData[] memory finalResult = new LotteryData[](count);
        for (uint i = 0; i < count; i++) {
            finalResult[i] = result[i];
        }
        return finalResult;
    }


    ////////////////////////////// TOKENS UTILS /////////////////////////

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

    //////////////////////////// PROTOCOL UTILS ////////////////


    function addProtocol(uint id) public {
        require(msg.sender == owner, "Only owner");
        require(protocols[id] == false, "Protocol with this id already exist");
        protocols[id] = true;
    }

    function removeProtocol(uint id) public {
        require(msg.sender == owner, "Only owner");
        require(protocols[id] == true, "Protocol with this id does not exist");
        protocols[id] = false;
    }

    function protocolSupported(uint id) view public returns(bool) {
        return protocols[id];
    }
}
