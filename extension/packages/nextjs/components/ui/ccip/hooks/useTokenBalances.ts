import { useEffect, useState } from "react";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Custom hook to fetch ERC20 token balances
export const useTokenBalances = (
  ownerAddr: string | undefined,
  tokenAddresses: Array<string>,
  alchemyHttp: string | undefined,
  pollingInterval = 5000,
) => {
  const [balances, setBalances] = useState<Array<[string, string]>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        if (!alchemyHttp) {
          throw Error("Alchemy Http not found");
        }
        if (!ownerAddr) {
          throw Error("No wallet connected");
        }
        const web3 = createAlchemyWeb3(alchemyHttp);
        setLoading(true);
        const { tokenBalances } = await web3.alchemy.getTokenBalances(
          ownerAddr,
          tokenAddresses.filter(t => {
            return t != "0x0000000000000000000000000000000000000000";
          }),
        );
        const newBalance: Array<[string, string]> = [];
        tokenBalances.forEach(token => {
          if (!token.tokenBalance) {
            return;
          }
          newBalance.push([token.contractAddress, token.tokenBalance]);
        });
        setBalances(newBalance);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    // Run initially
    fetchBalances();

    // Set up polling
    const intervalId = setInterval(fetchBalances, pollingInterval);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [ownerAddr, tokenAddresses.join(","), alchemyHttp, pollingInterval]);

  return { balances, loading };
};
