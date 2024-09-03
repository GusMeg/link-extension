import { Dispatch, SetStateAction, useState } from "react";
import type { Chain } from "viem";
import { useSwitchChain } from "wagmi";

export const NetworkDropdown = ({
  networkList,
  targetNetwork,
  bgColorAnim,
  setBgColorAnim,
}: {
  networkList: Array<Chain>;
  targetNetwork: string;
  bgColorAnim: boolean;
  setBgColorAnim: Dispatch<SetStateAction<boolean>>;
}) => {
  const { switchChainAsync } = useSwitchChain();

  return (
    <DropdownButton
      buttonText="Select Network"
      optionsList={networkList}
      onSelect={async (chain: Chain) => {
        setBgColorAnim(!bgColorAnim);
        await switchChainAsync({ chainId: chain.id });
        setBgColorAnim(bgColorAnim);
      }}
      selectedItem={targetNetwork}
      className=""
    />
  );
};

export const DropdownButton = ({
  optionsList,
  onSelect,
  selectedItem,
  className,
}: {
  buttonText: string;
  optionsList: Array<any>;
  onSelect: (item: any) => void;
  selectedItem: string;
  className: string | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectItem = (item: any) => {
    onSelect(item);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="relative z-10">
      {/* Button */}
      <button onClick={toggleDropdown} className={`px-4 py-2 btn ${className}`}>
        {selectedItem}
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute left-0 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
          {optionsList.map((item: any, index: number) => (
            <li key={index} onClick={() => selectItem(item)} className="px-4 py-2 cursor-pointer hover:bg-blue-100">
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
