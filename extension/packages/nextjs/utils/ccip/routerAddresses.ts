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

export const getRouterAddress = (fromChainId: number) => {
  switch (fromChainId) {
    case polygonAmoy.id:
      return "0x9C32fCB86BF0f4a1A8921a9Fe46de3198bb884B2";
    case baseSepolia.id:
      return "0xD3b06cEbF099CE7DA4AcCf578aaebFDBd6e88a93";
    case blastSepolia.id:
      return "0xfb2f2A207dC428da81fbAFfDDe121761f8Be1194";
    case celoAlfajores.id:
      return "0xb00E95b773528E2Ea724DB06B75113F239D15Dca";
    case avalancheFuji.id:
      return "0xF694E193200268f9a4868e4Aa017A0118C9a8177";
    case gnosisChiado.id:
      return "0x19b1bac554111517831ACadc0FD119D23Bb14391";
    case kromaSepolia.id:
      return "0xA8C0c11bf64AF62CDCA6f93D3769B88BdD7cb93D";
    case wemixTestnet.id:
      return "0xA8C0c11bf64AF62CDCA6f93D3769B88BdD7cb93D";
    case optimismSepolia.id:
      return "0x114A20A10b43D4115e5aeef7345a1A71d2a60C57";
    case sepolia.id:
      return "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59";
    case arbitrumSepolia.id:
      return "0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165";
    default:
      return zeroAddress.toString();
  }
};
