"use client";

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { PaginatedMsgBoard } from "./PaginatedMsgBoard";
import { ApproveLinkButton, NetworkDropdown, SendMsgButton } from "./buttons";
import { hexToRgba, useFade, useLinkAndUsdcBalance } from "./hooks";
import { sepolia } from "viem/chains";
import { useNetworkColor, useTargetNetwork } from "~~/hooks/scaffold-eth";
import { getTargetNetworks } from "~~/utils/scaffold-eth";

const InputMsgBox = ({ setMessage }: { message: string; setMessage: Dispatch<SetStateAction<string>> }) => {
  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMessage(e.currentTarget.value);
  };
  return (
    <div className="flex w-full py-3 px-10 z-10">
      <input
        type="text"
        id="message"
        placeholder="Write your message"
        className="p-1 border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={handleMessageChange}
      />
    </div>
  );
};

export const InputCcipMsg = ({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) => {
  const networkList = getTargetNetworks();
  const toNetwork = sepolia;

  const [message, setMessage] = useState("");
  const [sendingMsg, setSendingMsg] = useState(false);
  const [msgSent, setMsgSent] = useState(false);
  const [tx, setTx] = useState<`0x${string}` | undefined>(undefined);

  const [approving, setApproving] = useState(false);
  const [linkApproved, setLinkApproved] = useState(false);
  const [leftFade, setLeftFade] = useState(true);
  const opacityLeft = useFade(1500, leftFade);

  const { targetNetwork } = useTargetNetwork();
  const fromNetworkColor = useNetworkColor();

  const { fromTokenBalance } = useLinkAndUsdcBalance({ targetNetworkId: targetNetwork.id, toNetworkId: toNetwork?.id });

  return (
    <div className="flex min-w-full min-h-full justify-center items-center rounded-md overflow-hidden shadow-xl shadow-blue-900">
      {/*Container for the two columns*/}
      <div className="relative flex w-full h-full">
        {/* Left Column */}
        <div className="flex flex-col w-1/2">
          <div
            className={`flex h-1/3 justify-evenly items-center`}
            style={{ backgroundColor: hexToRgba(fromNetworkColor, opacityLeft * 0.6) }}
          >
            <div>From:</div>
            <NetworkDropdown
              networkList={networkList}
              targetNetwork={targetNetwork.name}
              bgColorAnim={leftFade}
              setBgColorAnim={setLeftFade}
            />
          </div>
          <div
            className={`flex flex-col h-1/3 justify-center items-center`}
            style={{ backgroundColor: hexToRgba(fromNetworkColor, opacityLeft * 0.4) }}
          >
            <InputMsgBox message={message} setMessage={setMessage} />
            <a className=" text-xs" href={`https://ccip.chain.link/tx/${tx}`}>
              Once sent, follow CCIP Tx here
            </a>
          </div>
          <div
            className={`flex flex-col h-1/3 justify-evenly items-center`}
            style={{ backgroundColor: hexToRgba(fromNetworkColor, opacityLeft * 0.2) }}
          >
            <div className="flex flex-col justify-center items-center">
              <div className="px-5">Link balance:</div>
              <div className="flex flex-row justify-center items-center">
                <div className={`${fromTokenBalance.length < 2 && "loading-spinner bg-slate-600 h-6 w-6"}`}>
                  {fromTokenBalance.length < 2 ? "" : Math.floor(parseInt(fromTokenBalance[1].at(1)!) / 10 ** 16) / 100}
                </div>
              </div>
            </div>
            <a href="https://faucets.chain.link/" target="_blank" className="text-xs text-blue-900">
              <div className=" text-clip text-xs text-center italic">
                This contract uses Link for paying fees, you must have a minimum balance or the tx will revert.
              </div>
            </a>
          </div>
        </div>
        {/* Right Column */}
        <div className="flex flex-col p-5 w-1/2 bg-secondary">
          <PaginatedMsgBoard rowsPerPage={4} />
        </div>
        {/* Center Button */}
        <div className={`${currentStep < 2 && "hidden"} absolute inset-0 flex justify-center items-center z-0`}>
          <SendMsgButton
            message={message}
            tx={tx}
            setTx={setTx}
            currentStep={currentStep}
            sendingMsg={sendingMsg}
            msgSent={msgSent}
            setApproved={setMsgSent}
            setApproving={setSendingMsg}
            setNextStep={setCurrentStep}
          />
        </div>
        {/* Lower Button */}
        <div
          className={`${currentStep < 1 && "hidden"} absolute inset-x-0 bottom-11 flex justify-center items-center z-0`}
        >
          <ApproveLinkButton
            currentStep={currentStep}
            approving={approving}
            linkApproved={linkApproved}
            setApproved={setLinkApproved}
            setApproving={setApproving}
            setNextStep={setCurrentStep}
          />
        </div>
      </div>
    </div>
  );
};
