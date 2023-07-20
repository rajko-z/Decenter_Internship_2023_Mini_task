// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProtocolUtils {

    mapping(uint => bool) public protocols;
    address private owner;

    uint internal constant AAVE_ID = 1;

    constructor() {
        owner = msg.sender;
        protocols[AAVE_ID] = true;
    }

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
