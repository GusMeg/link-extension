import { useState } from "react";
import { useMsgBoard } from "./hooks";
import { Address } from "~~/components/scaffold-eth";

export const PaginatedMsgBoard = ({ rowsPerPage }: { rowsPerPage: number }) => {
  const { msgArray, maxCount } = useMsgBoard();

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(Number(maxCount) / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = msgArray.slice(startIndex, startIndex + rowsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-5/6">
      <table className="flex flex-col w-full min-h-full table overflow-hidden rounded-xl">
        <thead>
          <tr key={0} className="flex justify-start items-stretch">
            <th className="flex w-5/12 justify-center items-center">ADDRESS</th>
            <th className="flex w-7/12 justify-center items-center">MESSAGE</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((msg, i) => {
            return (
              <tr key={i + 1} className="flex justify-start items-stretch outline-2">
                <td className="flex w-5/12 justify-center items-center">
                  <Address address={msg[0]} format="short" size="xs" />{" "}
                </td>
                <td className="flex w-7/12 justify-center items-center">{msg[1]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-evenly items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-3xl overflow-hidden disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-3xl overflow-hidden disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
