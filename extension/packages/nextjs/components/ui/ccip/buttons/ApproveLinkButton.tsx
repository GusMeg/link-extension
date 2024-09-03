import type { Dispatch, SetStateAction } from "react";
import { useWriteContract } from "wagmi";
import liveTestnet from "~~/app/link/liveTestnetContracts";
import { useTargetNetwork } from "~~/hooks/scaffold-eth";

export const ApproveLinkButton = ({
  approving,
  linkApproved,
  currentStep,
  setApproving,
  setApproved,
  setNextStep,
}: {
  approving: boolean;
  linkApproved: boolean;
  currentStep: number;
  setApproving: Dispatch<SetStateAction<boolean>>;
  setApproved: Dispatch<SetStateAction<boolean>>;
  setNextStep: Dispatch<SetStateAction<number>>;
}) => {
  const { writeContractAsync: approveLink } = useWriteContract();
  const { targetNetwork } = useTargetNetwork();

  async function handleApproveLink(amountLink: number) {
    setApproving(true);
    try {
      await approveLink({
        abi: liveTestnet[targetNetwork.id as keyof typeof liveTestnet].Link.abi,
        address: liveTestnet[targetNetwork.id as keyof typeof liveTestnet].Link.address,
        functionName: "approve",
        args: [
          liveTestnet[targetNetwork.id as keyof typeof liveTestnet].SenderWithMsg.address,
          BigInt(amountLink * 10 ** 18),
        ],
      });
      setNextStep(2);
      setApproved(true);
    } catch (error) {
      console.error(error);
    } finally {
      setApproving(false);
    }
  }
  return (
    <button
      className={`btn max-md:max-w-16 transition-opacity duration-500 ease-in-out ${currentStep == 0 && "opacity-0"} ${
        linkApproved && "bg-green-300"
      } ${approving || linkApproved ? "cursor-not-allowed pointer-events-none opacity-70" : "opacity-100"}`}
      onClick={() => {
        handleApproveLink(1);
      }}
    >
      <div className={`${!linkApproved && "loading-spinner  bg-slate-600"} h-6 w-6 ${!approving && "hidden"}`}></div>
      {approving && !linkApproved ? "Approving..." : linkApproved ? "Done" : "Approve Link"}
    </button>
  );
};
