// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ILottery {

    event DepositEvent(
        address user,
        uint amount,
        uint updatedTvl,
        uint updatedUserBalance
    );

    event WithdrawEvent(
        address user,
        uint amount,
        uint updatedTvl,
        bool isWinner
    );

    function deposit(uint amount) external;

    function withdraw() external;

    function end() external;

    function getName() external view returns(string memory);

    function getTvl() external view returns(uint);

    function getEndDate() external view returns(uint);

    function getMinAmountToDeposit() external view returns(uint);

    function getTotalYield() external view returns(uint);

    function getWinner() external view returns(address);

    function getProtocolId() external view returns(uint);

    function getToken() external view returns(address);

    function isFinished() external view returns(bool);

    function balanceOf(address _address) external view returns(uint);
}
