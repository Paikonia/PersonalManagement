import React from "react";
import EditDeleteButtons from "./EditDeleteButtons";

const ExpenseDisplay = ({
  expense,
  method,
  date,
  id,
}: {
  expense: string;
  method: string;
  date: string;
  id: string;
}) => {
  return (
    <div className="border-2 md:w-7/12 xl:w-5/12 overflow-hidden rounded-xl p-2 flex  mb-4 justify-between">
      <div className="flex w-10/12 sm:w-10/12 md:w-11/12 xl:w-5/6 px-1 py-0 left-0 justify-start items-center">
        <input type="checkbox" className="mx-1" name={id} id={id} />
        <p className="ml-2 w-30  sm:w-42 max-w-xs mr-2 truncate">{expense}</p>
        <h3 className="mr-2 w-20">{method}</h3>
        <h3 className="w-30 text-sm hidden sm:inline-block truncate sm:w-36 text-center ">
          {date.split("T")[0]}
        </h3>
      </div>
      <EditDeleteButtons />
    </div>
  );
};

export default ExpenseDisplay;
