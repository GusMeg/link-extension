import { Dispatch, SetStateAction } from "react";
import { useWriteContract } from "wagmi";
import liveTestnet from "~~/app/link/liveTestnetContracts";
import { useTargetNetwork } from "~~/hooks/scaffold-eth";

export const ApproveUsdcButton = ({
  approving,
  usdcApproved,
  currentStep,
  setApproving,
  setApproved,
  setNextStep,
}: {
  approving: boolean;
  usdcApproved: boolean;
  currentStep: number;
  setApproving: Dispatch<SetStateAction<boolean>>;
  setApproved: Dispatch<SetStateAction<boolean>>;
  setNextStep: Dispatch<SetStateAction<number>>;
}) => {
  const { writeContractAsync: approveUsdc } = useWriteContract();
  const { targetNetwork } = useTargetNetwork();

  async function handleApproveUsdc(amountUsdc: number) {
    setApproving(true);
    try {
      await approveUsdc({
        abi: liveTestnet[targetNetwork.id as keyof typeof liveTestnet].USDC.abi,
        address: liveTestnet[targetNetwork.id as keyof typeof liveTestnet].USDC.address,
        functionName: "approve",
        args: [
          liveTestnet[targetNetwork.id as keyof typeof liveTestnet].SenderWithMsg.address,
          BigInt(amountUsdc * 10 ** 6),
        ],
      });
      setNextStep(3);
      setApproved(true);
    } catch (error) {
      console.error(error);
    } finally {
      setApproving(false);
    }
  }

  return (
    <button
      className={`btn transition-opacity duration-500 ease-in-out ${currentStep < 2 && "opacity-0"} ${
        usdcApproved && "bg-green-300"
      } ${approving || usdcApproved ? "cursor-not-allowed pointer-events-none opacity-70" : "opacity-100"}`}
      onClick={() => {
        handleApproveUsdc(1);
      }}
    >
      <div className={`${!usdcApproved && "loading-spinner bg-slate-600"} h-6 w-6 ${!approving && "hidden"}`}></div>
      {approving && !usdcApproved ? "Approving..." : usdcApproved ? "Done" : "Approve USDC"}
    </button>
  );
};
