import { useTokenBalances } from "./hooks/useTokenBalances";
import { useAccount } from "wagmi";
import { getLinkAddress, getUsdcAddress } from "~~/utils/ccip";
import { getAlchemyHttpUrl } from "~~/utils/scaffold-eth";

export const useLinkAndUsdcBalance = ({
  targetNetworkId,
  toNetworkId,
}: {
  targetNetworkId: number;
  toNetworkId: number | undefined;
}) => {
  const fromAlchemyHttp = getAlchemyHttpUrl(targetNetworkId);
  const toAlchemyHttp = toNetworkId ? getAlchemyHttpUrl(toNetworkId) : undefined;
  const { address } = useAccount();

  const fromUsdcAddress = getUsdcAddress(targetNetworkId);
  const linkAddress = getLinkAddress(targetNetworkId);
  const toUsdcAddress = getUsdcAddress(toNetworkId);

  const { balances: fromTokenBalance } = useTokenBalances(address, [fromUsdcAddress, linkAddress], fromAlchemyHttp);
  const { balances: toTokenBalance } = useTokenBalances(address, [toUsdcAddress], toAlchemyHttp);

  return { fromTokenBalance, toTokenBalance };
};
