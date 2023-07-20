// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ILottery.sol";

interface ILotteryFactory {

    event CreatedEvent(
        address addr,
        string name,
        uint protocolId,
        address token,
        uint tvl,
        uint endDate,
        uint minAmountToDeposit
    );

    struct LotteryData {
        address contractAddress;
        string name;
        uint protocolId;
        address token;
        uint tvl;
        uint endDate;
        uint minAmountToDeposit;
        uint totalYield;
        address winner;
        bool finished;
        uint myAmount;
    }

    function createLottery(
        string memory _name,
        uint _protocolId,
        address _tokenAddress,
        uint _minAmountToDeposit,
        uint _amountToDeposit,
        uint _durationInDays
    )
    external;

    function getUserLotteries() external view returns (LotteryData[] memory);

    function getAllLotteries() external view returns (LotteryData[] memory);
}
