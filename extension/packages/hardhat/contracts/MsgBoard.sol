// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";

struct Msg {
    uint64 from;
    address sender;
    string message;
}

contract MsgBoard is CCIPReceiver{
    mapping(uint256 => Msg) msgDashboard;
    uint256 msgCount;

    constructor(address _router) CCIPReceiver(_router){}

    function _ccipReceive(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal override {
        address sender = abi.decode(any2EvmMessage.sender, (address));
        string memory message = abi.decode(any2EvmMessage.data, (string));
        uint64 from = any2EvmMessage.sourceChainSelector;
        msgDashboard[msgCount] = Msg(from, sender, message);
        msgCount++;
    }

    function getCount() external view returns(uint256){
        return msgCount;
    }

    function readMsg(uint256 count) external view returns(address sender, string memory newMsg){
        sender = msgDashboard[count].sender;
        newMsg = msgDashboard[count].message;
    }
}