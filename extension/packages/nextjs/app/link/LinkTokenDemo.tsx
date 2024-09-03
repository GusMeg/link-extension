import { Dispatch, SetStateAction } from "react";
import { InputCcipToken } from "~~/components/ui/ccip/InputCcip";

const RightTabTokenDemo = ({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) => {
  const labelText = (step: number) => {
    switch (step) {
      case 1:
        return <div className="text-justify font-bold text-sm">Approve the contract to take 1 Link (10**18 wei)</div>;
      case 2:
        return <div className="text-justify font-bold text-sm">Approve the contract to take 1 USDC (10**6 wei)</div>;
      case 3:
        return (
          <div className="text-justify font-bold text-sm">
            Set the destinatary <br /> Call the contract and send 1 usdc!
          </div>
        );
      default:
        return (
          <div className="text-justify font-bold text-sm">
            Try sending 1 USDC crosschain. <br /> Press start and follow the steps
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col justify-evenly items-center md:w-1/3 bg-blue-400 p-2 rounded-md shadow-xl shadow-blue-900">
      <div className="font-sans font-bold text-2xl">Token Transfer</div>
      <div className="text-justify text-md">
        {" "}
        <br /> In this demo, a sample smart contract is deployed, that interacts with the CCIP client for sending tokens
        to another account.{" "}
      </div>
      {labelText(currentStep)}
      <button
        className={`btn transition-opacity duration-300 ease-in-out ${
          currentStep == 0 ? "opacity-100" : "btn-disabled"
        }`}
        onClick={() => {
          setCurrentStep(1);
        }}
      >
        Start
      </button>
    </div>
  );
};

export const LinkTokenDemo = ({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  currentColor: string;
}) => {
  return (
    <div className="flex flex-wrap w-full py-5 px-10 justify-stretch items-stretch">
      <RightTabTokenDemo currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <div className="flex justify-center items-center md:w-2/3 w-full min-h-full">
        <div className="flex justify-center items-stretch w-full sm:min-h-72 min-h-96">
          <InputCcipToken currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </div>
      </div>
    </div>
  );
};
