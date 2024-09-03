import { zeroAddress } from "viem";
import {
  arbitrumSepolia,
  avalancheFuji,
  baseSepolia,
  blastSepolia,
  celoAlfajores,
  gnosisChiado,
  kromaSepolia,
  optimismSepolia,
  polygonAmoy,
  sepolia,
  wemixTestnet,
} from "viem/chains";

//Link token addresses on CCIP supported chains
export const getLinkAddress = (fromChainId: number) => {
  switch (fromChainId) {
    case polygonAmoy.id:
      return "0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904";
    case baseSepolia.id:
      return "0xE4aB69C077896252FAFBD49EFD26B5D171A32410";
    case blastSepolia.id:
      return "0x02c359ebf98fc8BF793F970F9B8302bb373BdF32";
    case celoAlfajores.id:
      return "0x32E08557B14FaD8908025619797221281D439071";
    case avalancheFuji.id:
      return "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846";
    case gnosisChiado.id:
      return "0xDCA67FD8324990792C0bfaE95903B8A64097754F";
    case kromaSepolia.id:
      return "0xa75cCA5b404ec6F4BB6EC4853D177FE7057085c8";
    case wemixTestnet.id:
      return "0x3580c7A817cCD41f7e02143BFa411D4EeAE78093";
    case sepolia.id:
      return "0x779877A7B0D9E8603169DdbD7836e478b4624789";
    case arbitrumSepolia.id:
      return "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E";
    case optimismSepolia.id:
      return "0xE4aB69C077896252FAFBD49EFD26B5D171A32410";
    default:
      return zeroAddress.toString();
  }
};
