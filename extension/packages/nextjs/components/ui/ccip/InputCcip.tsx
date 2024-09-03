"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { ApproveLinkButton, ApproveUsdcButton, DropdownButton, NetworkDropdown, SendUsdcButton } from "./buttons";
import { hexToRgba, useFade, useLinkAndUsdcBalance } from "./hooks";
import { Chain } from "viem/chains";
import { AddressInput } from "~~/components/scaffold-eth";
import { getNetworkColor, useNetworkColor, useTargetNetwork } from "~~/hooks/scaffold-eth";
import { ChainWithAttributes, getTargetNetworks } from "~~/utils/scaffold-eth";

export const InputCcipToken = ({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) => {
  const networkList = getTargetNetworks();
  const [toNetwork, setToNetwork] = useState<undefined | ChainWithAttributes>();
  const [destinatary, setDestinatary] = useState("");

  const [approving, setApproving] = useState(false);
  const [linkApproved, setLinkApproved] = useState(false);
  const [usdcApproved, setUsdcApproved] = useState(false);
  const [sendingUsdc, setSendingUsdc] = useState(false);
  const [txSendUsd, setTx] = useState<`0x${string}` | undefined>(undefined);
  const [leftFade, setLeftFade] = useState(true);
  const [rightFade, setRightFade] = useState(true);
  const opacityLeft = useFade(1500, leftFade);
  const opacityRight = useFade(1500, rightFade);

  const { targetNetwork } = useTargetNetwork();
  const fromNetworkColor = useNetworkColor();
  const toNetworkColor = toNetwork ? getNetworkColor(toNetwork, false) : "#66666";

  const { fromTokenBalance, toTokenBalance } = useLinkAndUsdcBalance({
    targetNetworkId: targetNetwork.id,
    toNetworkId: toNetwork?.id,
  });

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
            <div className="px-5">USDC Balance:</div>
            <div className="flex flex-row justify-center items-center">
              <div className={`${fromTokenBalance.length < 2 && "loading-spinner bg-slate-600 h-6 w-6"}`}>
                {fromTokenBalance.length < 2 ? "" : Math.floor(parseInt(fromTokenBalance[0].at(1)!) / 10 ** 4) / 100}
              </div>
            </div>
            <a href="https://faucet.circle.com/" target="_blank" className="text-xs text-blue-900">
              Get some from Faucet
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
        <div className="flex flex-col w-1/2">
          <div
            className="flex h-1/3 justify-evenly items-center bg-yellow-300"
            style={{ backgroundColor: hexToRgba(toNetworkColor, opacityRight * 0.6) }}
          >
            <div>To:</div>
            <DropdownButton
              buttonText="Choose Network"
              optionsList={networkList.filter(i => {
                return i.name != targetNetwork.name;
              })}
              onSelect={async (chain: Chain) => {
                setRightFade(!rightFade);
                setTimeout(() => {
                  setToNetwork(chain);
                  setRightFade(rightFade);
                }, 1500);
              }}
              selectedItem={toNetwork?.name === targetNetwork.name || !toNetwork ? "Choose Network" : toNetwork.name}
              className=""
            />
          </div>
          <div
            className="flex flex-col h-1/3 justify-center items-center bg-purple-300"
            style={{ backgroundColor: hexToRgba(toNetworkColor, opacityRight * 0.4) }}
          >
            <div className="px-5">USDC Balance:</div>
            <div className="flex flex-row justify-center items-center">
              <div className={`${toTokenBalance.length < 1 && "loading-spinner bg-slate-600 h-6 w-6"}`}>
                {toTokenBalance.length < 1 ? "" : Math.floor(parseInt(toTokenBalance[0].at(1)!) / 10 ** 4) / 100}
              </div>
            </div>
          </div>
          <div
            className="flex flex-col h-1/3 justify-evenly items-center bg-pink-300"
            style={{ backgroundColor: hexToRgba(toNetworkColor, opacityRight * 0.2) }}
          >
            <div className={` z-10 ${currentStep < 3 && "hidden"}`}>
              <AddressInput value={destinatary} onChange={setDestinatary} placeholder="Destinatary" />
            </div>
            <SendUsdcButton
              currentStep={currentStep}
              linkApproved={linkApproved}
              approving={approving}
              sendingUsdc={sendingUsdc}
              setUsdcApproved={setUsdcApproved}
              setLinkApproved={setLinkApproved}
              setSendingUsdc={setSendingUsdc}
              setNextStep={setCurrentStep}
              destinatary={destinatary}
              targetNetworkId={targetNetwork.id}
              toNetworkId={toNetwork?.id}
              setTx={setTx}
            />
            <a
              href={`https://ccip.chain.link/tx/${txSendUsd}`}
              className={`text-center text-xs ${currentStep > 2 && "hidden"}`}
            >
              Once sent, click here to follow CCIP Tx
            </a>
          </div>
        </div>
        {/* Center Button */}
        <div className={`${currentStep < 2 && "hidden"} absolute inset-0 flex justify-center items-center z-0`}>
          <ApproveUsdcButton
            currentStep={currentStep}
            approving={approving}
            usdcApproved={usdcApproved}
            setApproved={setUsdcApproved}
            setApproving={setApproving}
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
