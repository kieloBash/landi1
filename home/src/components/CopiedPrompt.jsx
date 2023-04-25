import React from "react";

const CopiedPrompt = ({toggleClose}) => {
  return (
    <div className="w-64 p-4 m-auto bg-white shadow-lg rounded-2xl dark:bg-gray-800">
      <div className="w-full h-full text-center">
        <div className="flex flex-col justify-between h-full">
          <svg
            className="w-12 h-12 m-auto mt-4 text-green-500"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <p className="px-6 py-2 text-gray-600 dark:text-gray-100 text-md">
            Details of 
            <span className="mx-1 font-bold text-gray-800 dark:text-white">
                Miner
            </span>
            has been copied to clipboard
          </p>
          <div className="flex items-center justify-between w-full gap-4 mt-8">
            <button
              type="button"
              onClick={toggleClose}
              className="py-2 px-4  bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopiedPrompt;
