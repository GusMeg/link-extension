import { zeroAddress } from "viem";
import {
  arbitrumSepolia,
  avalancheFuji,
  baseSepolia,
  celoAlfajores,
  optimismSepolia,
  polygonAmoy,
  sepolia,
} from "viem/chains";

//USDC addresses on supported CCIP chains
export const getUsdcAddress = (fromChainId: number | undefined): string => {
  if (!fromChainId) return zeroAddress.toString();
  switch (fromChainId) {
    case avalancheFuji.id:
      return "0x5425890298aed601595a70ab815c96711a31bc65";
    case baseSepolia.id:
      return "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
    case celoAlfajores.id:
      return "0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B";
    case polygonAmoy.id:
      return "0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582";
    case optimismSepolia.id:
      return "0x5fd84259d66Cd46123540766Be93DFE6D43130D7";
    case sepolia.id:
      return "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
    case arbitrumSepolia.id:
      return "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d";
    default:
      return zeroAddress.toString();
  }
};
