// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ILottery.sol";

interface ILotteryFactory {

    event CreatedEvent(
        address contractAddress,
        address userAddress,
        string name,
        uint protocolId,
        address tokenAddress,
        string tokenSymbol,
        uint tokenDecimals,
        uint endDate,
        uint minAmountToDeposit
    );

    struct LotteryData {
        address contractAddress;
        string name;
        uint protocolId;
        address tokenAddress;
        string tokenSymbol;
        uint tokenDecimals;
        uint tvl;
        uint endDate;
        uint minAmountToDeposit;
        uint currentYield;
        address winner;
        uint myAmount;
    }

    function createLottery(
        string memory _name,
        uint _protocolId,
        address _tokenAddress,
        uint _minAmountToDeposit,
        uint _durationInDays
    )
    external;

    function getLotteries(bool filterByUser) external view returns (LotteryData[] memory);
}
