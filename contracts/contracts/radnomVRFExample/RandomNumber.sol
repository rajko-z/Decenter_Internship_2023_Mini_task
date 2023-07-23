// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/VRFV2WrapperConsumerBase.sol";

contract RandomNumber is VRFV2WrapperConsumerBase {

    struct RequestStatus {
        uint256 paid;
        bool fulfilled;
        uint256 randomNumber;
    }

    uint256 public lastRequestId;
    uint32 private callbackGasLimit = 100000;
    uint16 private requestConfirmations = 3;
    uint32 private numWords = 1;
    mapping (uint256 => RequestStatus) public requests;

    constructor(address linkTokenAddress, address wrapperAddress)
        VRFV2WrapperConsumerBase(linkTokenAddress, wrapperAddress) {}

    function requestRandomNumber() external returns (uint256 requestId){
        requestId = requestRandomness(callbackGasLimit, requestConfirmations, numWords);
        requests[requestId] = RequestStatus({
            paid: VRF_V2_WRAPPER.calculateRequestPrice(callbackGasLimit),
            fulfilled: false,
            randomNumber: 0
        });
        lastRequestId = requestId;
        return requestId;
    }

    function fulfillRandomWords(uint256 _requestId, uint256[] memory _randomNumber) internal override {
        require(requests[_requestId].paid > 0, "request not found");
        requests[_requestId].fulfilled = true;
        requests[_requestId].randomNumber = _randomNumber[0];
    }

    function getRequestStatus(uint256 _requestId) external view returns(uint256 paid, bool fulfilled, uint256 randomNumber) {
        require(requests[_requestId].paid > 0, "request not found");
        RequestStatus memory request = requests[_requestId];
        return (request.paid, request.fulfilled, request.randomNumber);
    }
}
