// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/ILottery.sol";
import "./interfaces/ILotteryFactory.sol";
import "./aave/LotteryAave.sol";
import "./interfaces/IERC20.sol";
import "./MinimalProxyFactory.sol";
import "./utils/ProtocolUtils.sol";

contract LotteryFactory is ILotteryFactory, MinimalProxyFactory, ProtocolUtils {

    uint public constant minDurationInDays = 10;

    ILottery[] public lotteries;

    constructor(address _aaveLotteryBaseAddress) {
        supportedProtocols[AAVE_ID] = _aaveLotteryBaseAddress;
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
        require(_durationInDays >= minDurationInDays, "Lottery duration to short");
        require(tokenSupported(_tokenAddress), "Token not supported");
        require(_minAmountToDeposit >= tokenMinAmount(_tokenAddress), "Min amount not enough");
        require(protocolSupported(_protocolId), "Protocol not supported");

        ILottery newLottery = ILottery(createClone(supportedProtocols[_protocolId]));
        newLottery.init(_name, _tokenAddress, tokenToAtoken[_tokenAddress], _minAmountToDeposit, _durationInDays, owner());
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
                contractAddress : address(lottery),
                name : lottery.getName(),
                protocolId : lottery.getProtocolId(),
                tokenAddress : lottery.getTokenAddress(),
                tokenSymbol : IERC20(lottery.getTokenAddress()).symbol(),
                tokenDecimals : IERC20(lottery.getTokenAddress()).decimals(),
                tvl : lottery.getTvl(),
                endDate : lottery.getEndDate(),
                minAmountToDeposit : lottery.getMinAmountToDeposit(),
                currentYield : lottery.getCurrentYield(),
                winner : lottery.getWinner(),
                myAmount : lottery.balanceOf(msg.sender)
            });
            count += 1;
        }

        LotteryData[] memory finalResult = new LotteryData[](count);
        for (uint i = 0; i < count; i++) {
            finalResult[i] = result[i];
        }

        return finalResult;
    }

    function getLotteryByAddress(address addr) external view returns (LotteryData memory) {
        ILottery lottery = ILottery(addr);
        return LotteryData({
            contractAddress : address(lottery),
            name : lottery.getName(),
            protocolId : lottery.getProtocolId(),
            tokenAddress : lottery.getTokenAddress(),
            tokenSymbol : IERC20(lottery.getTokenAddress()).symbol(),
            tokenDecimals : IERC20(lottery.getTokenAddress()).decimals(),
            tvl : lottery.getTvl(),
            endDate : lottery.getEndDate(),
            minAmountToDeposit : lottery.getMinAmountToDeposit(),
            currentYield : lottery.getCurrentYield(),
            winner : lottery.getWinner(),
            myAmount : lottery.balanceOf(msg.sender)
        });
    }
}
