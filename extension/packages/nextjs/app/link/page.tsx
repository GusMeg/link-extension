"use client";

import { useState } from "react";
import Image from "next/image";
import { LinkMsgDemo } from "./LinkMsgDemo";
import { LinkTokenDemo } from "./LinkTokenDemo";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useNetworkColor } from "~~/hooks/scaffold-eth";

const LinkHeader = () => {
  return (
    <div className="flex flex-col w-full py-2 px-10 justify-center items-center">
      <div className="flex px-5 flex-col bg-secondary rounded-lg shadow-lg shadow-blue-900">
        <div className="flex w-full px-5 pt-2 justify-center items-center">
          <span className="px-5 font-bold">SCAFFOLD-ETH</span>
          <div className="flex relative w-12 h-12">
            <Image alt="SE2 logo" fill src="/logo.svg" />
          </div>
          <div className="flex relative w-12 h-12">
            <XMarkIcon title="X icon" />
          </div>
          <div className="flex relative w-12 h-12">
            <svg width="48" height="48" viewBox="0 0 247 284" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M123.5 0L0 70.9726V212.918L123.5 283.89L247 212.918V70.9726L123.5 0ZM194.679 182.837L123.523 223.728L52.3663 182.837V101.054L123.523 60.1621L194.679 101.054V182.837Z"
                fill="#0847F7"
              ></path>
            </svg>
          </div>
          <span className="px-2 font-bold">CCIP EXTENSION</span>
        </div>
        <div className="flex flex-col px-5 py-2 w-full justify-start items-start text-justify">
          <span>
            <strong>Chainlink CCIP</strong> is an <i>interoperability protocol</i> that enables to{" "}
            <strong>transfer tokens, messages (data), or both across chains</strong>.
          </span>
          <span>
            In this extension you can leverage your CCIP dapps by using built-in hooks and useful data{" "}
            <i>(router addresses, chain IDs, etc)</i>. Also, a sample smartcontract is deployed for sending tokens and
            data crosschain.
          </span>
        </div>
      </div>
    </div>
  );
};

const LinkMainPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [msgCurrentStep, setMsgCurrentStep] = useState(0);
  const currentColor = useNetworkColor();

  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <LinkHeader />
      <LinkTokenDemo currentColor={currentColor} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <LinkMsgDemo currentColor={currentColor} currentStep={msgCurrentStep} setCurrentStep={setMsgCurrentStep} />
    </div>
  );
};
export default LinkMainPage;
