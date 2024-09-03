import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

/**
 * @example
 * const externalContracts = {
 *   1: {
 *     DAI: {
 *       address: "0x...",
 *       abi: [...],
 *     },
 *   },
 * } as const;
 */
const liveTestnet = {
  11155420: {
    Link: {
      address: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    },
    USDC: {
      address: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    },
    SenderWithMsg: {
      address: "0x75036f2Bb3208DAD7a465657c0094d7827Ad1909",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_router",
              type: "address",
            },
            {
              internalType: "address",
              name: "_link",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "bytes32",
              name: "messageId",
              type: "bytes32",
            },
            {
              indexed: true,
              internalType: "uint64",
              name: "destinationChainSelector",
              type: "uint64",
            },
            {
              indexed: false,
              internalType: "address",
              name: "receiver",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "text",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "fees",
              type: "uint256",
            },
          ],
          name: "MessageSent",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "bytes32",
              name: "messageId",
              type: "bytes32",
            },
            {
              indexed: true,
              internalType: "uint64",
              name: "destinationChainSelector",
              type: "uint64",
            },
            {
              indexed: false,
              internalType: "address",
              name: "receiver",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "fees",
              type: "uint256",
            },
          ],
          name: "TokensTransferred",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint64",
              name: "destinationChainSelector",
              type: "uint64",
            },
            {
              internalType: "address",
              name: "receiver",
              type: "address",
            },
            {
              internalType: "string",
              name: "text",
              type: "string",
            },
          ],
          name: "sendMessage",
          outputs: [
            {
              internalType: "bytes32",
              name: "messageId",
              type: "bytes32",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint64",
              name: "_destinationChain",
              type: "uint64",
            },
            {
              internalType: "address",
              name: "_token",
              type: "address",
            },
            {
              internalType: "address",
              name: "_receiver",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_amount",
              type: "uint256",
            },
          ],
          name: "transferToken2AnyChain",
          outputs: [
            {
              internalType: "bytes32",
              name: "messageId",
              type: "bytes32",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    },
    MsgBoard: {
      address: "0x0a0b888B742E7c6125eF4897cA4ffB5426d07AC8",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_router",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "router",
              type: "address",
            },
          ],
          name: "InvalidRouter",
          type: "error",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "bytes32",
                  name: "messageId",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "sourceChainSelector",
                  type: "uint64",
                },
                {
                  internalType: "bytes",
                  name: "sender",
                  type: "bytes",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
                {
                  components: [
                    {
                      internalType: "address",
                      name: "token",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "amount",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Client.EVMTokenAmount[]",
                  name: "destTokenAmounts",
                  type: "tuple[]",
                },
              ],
              internalType: "struct Client.Any2EVMMessage",
              name: "message",
              type: "tuple",
            },
          ],
          name: "ccipReceive",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "getCount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getRouter",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "count",
              type: "uint256",
            },
          ],
          name: "readMsg",
          outputs: [
            {
              internalType: "address",
              name: "sender",
              type: "address",
            },
            {
              internalType: "string",
              name: "newMsg",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes4",
              name: "interfaceId",
              type: "bytes4",
            },
          ],
          name: "supportsInterface",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
      ],
    },
  },
  421614: {
    Link: {
      address: "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    },
    USDC: {
      address: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    },
    MsgBoard: {
      address: "0x0a0b888B742E7c6125eF4897cA4ffB5426d07AC8",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_router",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "router",
              type: "address",
            },
          ],
          name: "InvalidRouter",
          type: "error",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "bytes32",
                  name: "messageId",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "sourceChainSelector",
                  type: "uint64",
                },
                {
                  internalType: "bytes",
                  name: "sender",
                  type: "bytes",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
                {
                  components: [
                    {
                      internalType: "address",
                      name: "token",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "amount",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Client.EVMTokenAmount[]",
                  name: "destTokenAmounts",
                  type: "tuple[]",
                },
              ],
              internalType: "struct Client.Any2EVMMessage",
              name: "message",
              type: "tuple",
            },
          ],
          name: "ccipReceive",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "getCount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getRouter",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "count",
              type: "uint256",
            },
          ],
          name: "readMsg",
          outputs: [
            {
              internalType: "address",
              name: "sender",
              type: "address",
            },
            {
              internalType: "string",
              name: "newMsg",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes4",
              name: "interfaceId",
              type: "bytes4",
            },
          ],
          name: "supportsInterface",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
      ],
    },
    SenderWithMsg: {
      address: "0x75036f2Bb3208DAD7a465657c0094d7827Ad1909",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_router",
              type: "address",
            },
            {
              internalType: "address",
              name: "_link",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "bytes32",
              name: "messageId",
              type: "bytes32",
            },
            {
              indexed: true,
              internalType: "uint64",
              name: "destinationChainSelector",
              type: "uint64",
            },
            {
              indexed: false,
              internalType: "address",
              name: "receiver",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "text",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "fees",
              type: "uint256",
            },
          ],
          name: "MessageSent",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "bytes32",
              name: "messageId",
              type: "bytes32",
            },
            {
              indexed: true,
              internalType: "uint64",
              name: "destinationChainSelector",
              type: "uint64",
            },
            {
              indexed: false,
              internalType: "address",
              name: "receiver",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "fees",
              type: "uint256",
            },
          ],
          name: "TokensTransferred",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint64",
              name: "destinationChainSelector",
              type: "uint64",
            },
            {
              internalType: "address",
              name: "receiver",
              type: "address",
            },
            {
              internalType: "string",
              name: "text",
              type: "string",
            },
          ],
          name: "sendMessage",
          outputs: [
            {
              internalType: "bytes32",
              name: "messageId",
              type: "bytes32",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint64",
              name: "_destinationChain",
              type: "uint64",
            },
            {
              internalType: "address",
              name: "_token",
              type: "address",
            },
            {
              internalType: "address",
              name: "_receiver",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_amount",
              type: "uint256",
            },
          ],
          name: "transferToken2AnyChain",
          outputs: [
            {
              internalType: "bytes32",
              name: "messageId",
              type: "bytes32",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    },
  },
  11155111: {
    Link: {
      address: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    },
    USDC: {
      address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    },
    SenderWithMsg: {
      address: "0x2cceddDF391aC696e4ac1037F438DFc62F9412C2",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_router",
              type: "address",
            },
            {
              internalType: "address",
              name: "_link",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "bytes32",
              name: "messageId",
              type: "bytes32",
            },
            {
              indexed: true,
              internalType: "uint64",
              name: "destinationChainSelector",
              type: "uint64",
            },
            {
              indexed: false,
              internalType: "address",
              name: "receiver",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "text",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "fees",
              type: "uint256",
            },
          ],
          name: "MessageSent",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "bytes32",
              name: "messageId",
              type: "bytes32",
            },
            {
              indexed: true,
              internalType: "uint64",
              name: "destinationChainSelector",
              type: "uint64",
            },
            {
              indexed: false,
              internalType: "address",
              name: "receiver",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "fees",
              type: "uint256",
            },
          ],
          name: "TokensTransferred",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint64",
              name: "destinationChainSelector",
              type: "uint64",
            },
            {
              internalType: "address",
              name: "receiver",
              type: "address",
            },
            {
              internalType: "string",
              name: "text",
              type: "string",
            },
          ],
          name: "sendMessage",
          outputs: [
            {
              internalType: "bytes32",
              name: "messageId",
              type: "bytes32",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint64",
              name: "_destinationChain",
              type: "uint64",
            },
            {
              internalType: "address",
              name: "_token",
              type: "address",
            },
            {
              internalType: "address",
              name: "_receiver",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_amount",
              type: "uint256",
            },
          ],
          name: "transferToken2AnyChain",
          outputs: [
            {
              internalType: "bytes32",
              name: "messageId",
              type: "bytes32",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    },
    MsgBoard: {
      address: "0x25FdB23dB3fede014B0f44d6df7613797220c778",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_router",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "router",
              type: "address",
            },
          ],
          name: "InvalidRouter",
          type: "error",
        },
        {
          inputs: [
            {
              components: [
                {
                  internalType: "bytes32",
                  name: "messageId",
                  type: "bytes32",
                },
                {
                  internalType: "uint64",
                  name: "sourceChainSelector",
                  type: "uint64",
                },
                {
                  internalType: "bytes",
                  name: "sender",
                  type: "bytes",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
                {
                  components: [
                    {
                      internalType: "address",
                      name: "token",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "amount",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct Client.EVMTokenAmount[]",
                  name: "destTokenAmounts",
                  type: "tuple[]",
                },
              ],
              internalType: "struct Client.Any2EVMMessage",
              name: "message",
              type: "tuple",
            },
          ],
          name: "ccipReceive",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "getCount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getRouter",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "count",
              type: "uint256",
            },
          ],
          name: "readMsg",
          outputs: [
            {
              internalType: "address",
              name: "sender",
              type: "address",
            },
            {
              internalType: "string",
              name: "newMsg",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes4",
              name: "interfaceId",
              type: "bytes4",
            },
          ],
          name: "supportsInterface",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
      ],
    },
  },
} as const;

export default liveTestnet satisfies GenericContractsDeclaration;
