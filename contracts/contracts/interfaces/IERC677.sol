// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./IERC20.sol";

interface IERC677 is IERC20 {
    function transferAndCall(
        address to,
        uint value,
        bytes memory data
    )
    external
    returns (bool success);
}