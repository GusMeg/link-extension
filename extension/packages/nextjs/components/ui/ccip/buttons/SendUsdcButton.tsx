import { Dispatch, SetStateAction } from "react";
import { useWriteContract } from "wagmi";
import liveTestnet from "~~/app/link/liveTestnetContracts";
import { useTargetNetwork } from "~~/hooks/scaffold-eth";
import { getDestinationChain, getUsdcAddress } from "~~/utils/ccip";

export const SendUsdcButton = ({
  sendingUsdc,
  currentStep,
  targetNetworkId,
  toNetworkId,
  destinatary,
  setSendingUsdc,
  setUsdcApproved,
  setNextStep,
  setLinkApproved,
  setTx,
}: {
  sendingUsdc: boolean;
  approving: boolean;
  linkApproved: boolean;
  currentStep: number;
  targetNetworkId: number | undefined;
  toNetworkId: number | undefined;
  destinatary: string;
  setSendingUsdc: Dispatch<SetStateAction<boolean>>;
  setUsdcApproved: Dispatch<SetStateAction<boolean>>;
  setNextStep: Dispatch<SetStateAction<number>>;
  setLinkApproved: Dispatch<SetStateAction<boolean>>;
  setTx: Dispatch<SetStateAction<`0x${string}` | undefined>>;
}) => {
  const { writeContractAsync: sendUsdc } = useWriteContract();
  const { targetNetwork } = useTargetNetwork();

  async function handleSendUsdc(receiver: string) {
    setSendingUsdc(true);
    try {
      if (!toNetworkId) throw Error("To Network not defined");
      if (!targetNetworkId) throw Error("From Network not defined");
      const destinationChain = getDestinationChain(toNetworkId);
      const usdcAddress = getUsdcAddress(targetNetworkId);
      const txSendUsdc = await sendUsdc({
        abi: liveTestnet[targetNetwork.id as keyof typeof liveTestnet].SenderWithMsg.abi,
        address: liveTestnet[targetNetwork.id as keyof typeof liveTestnet].SenderWithMsg.address,
        functionName: "transferToken2AnyChain",
        args: [destinationChain, usdcAddress, receiver, BigInt(1 * 10 ** 6)],
      });

      setTx(txSendUsdc);
      setLinkApproved(false);
      setUsdcApproved(false);
      setNextStep(0);
    } catch (error) {
      console.log(error);
    } finally {
      setSendingUsdc(false);
    }
  }

  return (
    <button
      className={`z-10 btn ${
        currentStep < 3 || sendingUsdc ? "cursor-not-allowed pointer-events-none opacity-70" : "opacity-100"
      }`}
      onClick={() => {
        handleSendUsdc(destinatary);
      }}
    >
      <div className={`${sendingUsdc ? "loading-spinner bg-slate-600" : "hidden"} h-6 w-6 `}></div>
      Send 1 USDC
    </button>
  );
};
