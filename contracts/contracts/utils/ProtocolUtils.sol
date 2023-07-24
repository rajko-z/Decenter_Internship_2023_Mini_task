// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TokenUtils.sol";

contract ProtocolUtils is TokenUtils {

    mapping(uint => address) public supportedProtocols;

    uint internal constant AAVE_ID = 1;

    function addProtocol(uint id, address lotteryBaseAddress) public onlyOwner {
        require(supportedProtocols[id] == address(0), "Protocol already exist");
        supportedProtocols[id] = lotteryBaseAddress;
    }

    function removeProtocol(uint id) public onlyOwner {
        require(supportedProtocols[id] != address(0), "Protocol does not exist");
        supportedProtocols[id] = address(0);
    }

    function protocolSupported(uint id) public view returns(bool) {
        return supportedProtocols[id] != address(0);
    }
}
