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

export const getDestinationChain = (toChainId: number) => {
  switch (toChainId) {
    case polygonAmoy.id:
      return 16281711391670634445n;
    case baseSepolia.id:
      return 10344971235874465080n;
    case blastSepolia.id:
      return 2027362563942762617n;
    case celoAlfajores.id:
      return 3552045678561919002n;
    case avalancheFuji.id:
      return 14767482510784806043n;
    case gnosisChiado.id:
      return 8871595565390010547n;
    case kromaSepolia.id:
      return 5990477251245693094n;
    case optimismSepolia.id:
      return 5224473277236331295n;
    case sepolia.id:
      return 16015286601757825753n;
    case arbitrumSepolia.id:
      return 3478487238524512106n;
    case wemixTestnet.id:
      return 9284632837123596123n;
    default:
      return 0n;
  }
};
