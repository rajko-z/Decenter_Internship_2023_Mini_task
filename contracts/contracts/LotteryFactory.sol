// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/ILottery.sol";
import "./interfaces/ILotteryFactory.sol";
import "./utils/ProtocolUtils.sol";
import "./utils/TokensUtils.sol";
import "./aave/LotteryAave.sol";

contract LotteryFactory is ILotteryFactory, ProtocolUtils, TokensUtils {

    ILottery[] public lotteries;

    function createLottery(
        string memory _name,
        uint _protocolId,
        address _tokenAddress,
        uint _minAmountToDeposit,
        uint _amountToDeposit,
        uint _durationInDays
    )
    external
    {
        require(tokenSupported(_tokenAddress), "Token not supported");
        require(_minAmountToDeposit >= tokenMinAmount(_tokenAddress), "Min amount not enough");
        require(protocolSupported(_protocolId), "Protocol not supported");

        ILottery newLottery;
        if (_protocolId == 1) {
            newLottery = new LotteryAave(_name, _tokenAddress, _minAmountToDeposit, _amountToDeposit, _durationInDays);
        }
        lotteries.push(newLottery);

        uint endDate = block.timestamp + _durationInDays * 1 days;
        emit CreatedEvent(
            address(newLottery),
            _name,
            _protocolId,
            _tokenAddress,
            _amountToDeposit,
            endDate,
            _minAmountToDeposit);
    }

    function getUserLotteries() external view returns (LotteryData[] memory) {
        LotteryData[] memory retVal = new LotteryData[](lotteries.length);
        for (uint i = 0; i < lotteries.length; i++) {
            ILottery lottery = lotteries[i];
            if (lottery.balanceOf(msg.sender) != 0) {
                retVal[i] = LotteryData(
                    {
                        contractAddress: address(lottery),
                        name: lottery.getName(),
                        protocolId: lottery.getProtocolId(),
                        token: lottery.getToken(),
                        tvl: lottery.getTvl(),
                        endDate: lottery.getEndDate(),
                        minAmountToDeposit: lottery.getMinAmountToDeposit(),
                        totalYield: lottery.getTotalYield(),
                        winner: lottery.getWinner(),
                        finished: lottery.isFinished(),
                        myAmount: lottery.balanceOf(msg.sender)
                    }
                );
            }
        }
        return retVal;
    }

    function getAllLotteries() external view returns (LotteryData[] memory) {
        LotteryData[] memory retVal = new LotteryData[](lotteries.length);
        for (uint i = 0; i < lotteries.length; i++) {
            ILottery lottery = lotteries[i];
            retVal[i] = LotteryData(
                {
                    contractAddress: address(lottery),
                    name: lottery.getName(),
                    protocolId: lottery.getProtocolId(),
                    token: lottery.getToken(),
                    tvl: lottery.getTvl(),
                    endDate: lottery.getEndDate(),
                    minAmountToDeposit: lottery.getMinAmountToDeposit(),
                    totalYield: lottery.getTotalYield(),
                    winner: lottery.getWinner(),
                    finished: lottery.isFinished(),
                    myAmount: lottery.balanceOf(msg.sender)
                }
            );
        }
        return retVal;
    }
}
