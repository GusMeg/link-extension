import { Dispatch, SetStateAction } from "react";
import { sepolia } from "viem/chains";
import { useWriteContract } from "wagmi";
import liveTestnet from "~~/app/link/liveTestnetContracts";
import { useTargetNetwork } from "~~/hooks/scaffold-eth";
import { getDestinationChain } from "~~/utils/ccip";

export const SendMsgButton = ({
  sendingMsg,
  msgSent,
  currentStep,
  message,
  setApproving,
  setApproved,
  setNextStep,
  setTx,
}: {
  tx: undefined | `0x${string}`;
  sendingMsg: boolean;
  msgSent: boolean;
  currentStep: number;
  message: string;
  setApproving: Dispatch<SetStateAction<boolean>>;
  setApproved: Dispatch<SetStateAction<boolean>>;
  setNextStep: Dispatch<SetStateAction<number>>;
  setTx: Dispatch<SetStateAction<undefined | `0x${string}`>>;
}) => {
  const { writeContractAsync: sendMsgAsync } = useWriteContract();
  const { targetNetwork } = useTargetNetwork();
  const msgBoardAddres = "0x25FdB23dB3fede014B0f44d6df7613797220c778"; //Hardcode for receiving on Sepolia
  const destination = getDestinationChain(sepolia.id);

  async function handleSendMsg() {
    setApproving(true);
    try {
      const tx = await sendMsgAsync({
        abi: liveTestnet[targetNetwork.id as keyof typeof liveTestnet].SenderWithMsg.abi,
        address: liveTestnet[targetNetwork.id as keyof typeof liveTestnet].SenderWithMsg.address,
        functionName: "sendMessage",
        args: [destination, msgBoardAddres, message],
      });
      setTx(tx);
      setNextStep(0);
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
        msgSent && "bg-green-300"
      } ${sendingMsg || msgSent ? "cursor-not-allowed pointer-events-none opacity-70" : "opacity-100"}`}
      onClick={() => {
        handleSendMsg();
      }}
    >
      <div className={`${!msgSent && "loading-spinner  bg-slate-600"} h-6 w-6 ${!sendingMsg && "hidden"}`}></div>
      {sendingMsg && !msgSent ? "Approving..." : sendingMsg ? "Done" : "Send"}
    </button>
  );
};
