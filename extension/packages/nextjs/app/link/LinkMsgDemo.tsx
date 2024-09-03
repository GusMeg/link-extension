import { Dispatch, SetStateAction } from "react";
import { InputCcipMsg } from "~~/components/ui/ccip/InputMsgCcip";

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
        return <div className="text-justify font-bold text-sm">Write your message and send!</div>;
      case 3:
        return (
          <div className="text-justify font-bold text-sm">
            Set the destinatary <br /> Call the contract and send 1 usdc!
          </div>
        );
      default:
        return (
          <div className="text-justify font-bold text-sm">
            Try sending a message crosschain. <br /> Press start and follow the steps
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col justify-evenly items-center md:w-1/3 bg-blue-400 py-2 px-5 rounded-md shadow-xl shadow-blue-900">
      <div className="font-sans font-bold text-2xl">Contract Iinteraction</div>
      <div className="text-justify text-md">
        {" "}
        <br /> In this demo you can send a message crosschain to a smartcontract deployed on arbitrum sepolia.{" "}
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

export const LinkMsgDemo = ({
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
          <InputCcipMsg currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </div>
      </div>
    </div>
  );
};
