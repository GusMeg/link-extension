// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol";

contract SenderWithMsg {
  
    // Event emitted when a message is sent to another chain.
    event MessageSent(
        bytes32 indexed messageId, // The unique ID of the CCIP message.
        uint64 indexed destinationChainSelector, // The chain selector of the destination chain.
        address receiver, // The address of the receiver on the destination chain.
        string text, // The text being sent.
        uint256 fees // The fees paid for sending the CCIP message.
    );

    event TokensTransferred(
        bytes32 indexed messageId, // The unique ID of the message.
        uint64 indexed destinationChainSelector, // The chain selector of the destination chain.
        address receiver, // The address of the receiver on the destination chain.
        uint256 fees // The fees paid for sending the message.
    );

    IRouterClient private router;
    IERC20 private linkToken;

    constructor(address _router, address _link) {
        router = IRouterClient(_router);
        linkToken = IERC20(_link);
    }
   
    function transferToken2AnyChain(
        uint64 _destinationChain,
        address _token,
        address _receiver,
        uint256 _amount
    )
        external
        returns (bytes32 messageId)
    {
        //Initialize variables
        IERC20 token = IERC20(_token);

        Client.EVMTokenAmount[]
            memory tokenAmounts = new Client.EVMTokenAmount[](1);
        Client.EVMTokenAmount memory tokenAmount = Client.EVMTokenAmount({
            token: _token,
            amount: _amount
        });
        tokenAmounts[0] = tokenAmount;

        // Build the CCIP Message
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(_receiver),
            data: "",
            tokenAmounts: tokenAmounts,
            extraArgs: Client._argsToBytes(
                Client.EVMExtraArgsV1({gasLimit: 0})
            ),
            feeToken: address(linkToken)
        });
       
        // CCIP Fees Management
        uint256 fees = router.getFee(_destinationChain, message);

        // Transfer tokens from user this contract
        require(linkToken.transferFrom(msg.sender, address(this), fees), "Couldnt transfer Link");
        require(token.transferFrom(msg.sender, address(this), _amount), "Couldnt transfer token");
        
        // Approve Router to spend tokens we send
        linkToken.approve(address(router), fees);
        IERC20(_token).approve(address(router), _amount);
       
        // Send CCIP Message
        messageId = router.ccipSend(_destinationChain, message);
       
        emit TokensTransferred(
            messageId,
            _destinationChain,
            _receiver,
            fees
        );
    }

    function sendMessage(
        uint64 destinationChainSelector,
        address receiver,
        string calldata text
    ) external returns (bytes32 messageId) {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver), // ABI-encoded receiver address
            data: abi.encode(text), // ABI-encoded string
            tokenAmounts: new Client.EVMTokenAmount[](0), // Empty array indicating no tokens are being sent
            extraArgs: Client._argsToBytes(
                // Additional arguments, setting gas limit
                Client.EVMExtraArgsV1({gasLimit: 200_000})
            ),
            // Set the feeToken  address, indicating LINK will be used for fees
            feeToken: address(linkToken)
        });

        // Get the fee required to send the message
        uint256 fees = router.getFee(
            destinationChainSelector,
            evm2AnyMessage
        );

        // Transfer tokens from user this contract
        require(linkToken.transferFrom(msg.sender, address(this), fees), "Couldnt transfer Link");
        
        // Approve the Router to transfer LINK tokens on contract's behalf. It will spend the fees in LINK
        linkToken.approve(address(router), fees);

        // Send the message through the router and store the returned message ID
        messageId = router.ccipSend(destinationChainSelector, evm2AnyMessage);

        // Emit an event with message details
        emit MessageSent(
            messageId,
            destinationChainSelector,
            receiver,
            text,
            fees
        );

        // Return the message ID
        return messageId;
    }
}