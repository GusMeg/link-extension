import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import liveTestnet from "~~/app/link/liveTestnetContracts";

export const useMsgBoard = () => {
  const [msgArray, setMsg] = useState<Array<[string, string]>>([]);
  const [maxCount, setMaxCount] = useState(BigInt(0));

  const client = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  useEffect(() => {
    async function fetchCount() {
      if (!client) return;
      const result = await client.readContract({
        abi: liveTestnet[11155111].MsgBoard.abi,
        address: liveTestnet[11155111].MsgBoard.address,
        functionName: "getCount",
      });

      if (result > maxCount) {
        setMaxCount(result);
      }
    }

    fetchCount();
    async function fetch() {
      const newMsg: Array<[string, string]> = [];
      try {
        if (!client) return;
        for (let i = 0; i < maxCount; i++) {
          const result = await client.readContract({
            abi: liveTestnet[11155111].MsgBoard.abi,
            address: liveTestnet[11155111].MsgBoard.address,
            functionName: "readMsg",
            args: [BigInt(i)],
          });
          newMsg.push([result[0], result[1]]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setMsg(newMsg);
      }
    }
    fetch();
  }, [maxCount]);

  return { msgArray, maxCount };
};
