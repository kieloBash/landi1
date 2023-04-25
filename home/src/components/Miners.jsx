import React from "react";

const Miners = ({ miners, toggleCompute }) => {
  return (
    <div className="relative w-full p-4 overflow-hidden bg-white shadow-lg rounded-xl md:w-60 dark:bg-gray-800">
      <p className="mb-6 text-xl text-center font-medium text-gray-600 dark:text-white">
        Miners Today
      </p>
      <div className="grid grid-cols-3 gap-4">
        {miners.map((miner, index) => {
          const min = 1; // minimum value
          const max = 5; // maximum value
          const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

          let color = "";
          switch (randomNum) {
            case 1:
              color = "bg-blue-500";
              break;
            case 2:
              color = "bg-red-500";
              break;
            case 3:
              color = "bg-green-500";
              break;
            case 4:
              color = "bg-yellow-500";
              break;
            case 5:
              color = "bg-orange-500";
              break;
            default:
              break;
          }

          return (
            <div className="flex flex-col items-center" key={index}>
              <div className="relative">
                <button className="relative block" onClick={()=>toggleCompute(miner)}>
                  <div
                    className={`mx-auto object-cover rounded-full h-10 w-10 ${color}`}
                  ></div>
                </button>
                <svg
                  width="10"
                  height="10"
                  fill="currentColor"
                  className={`absolute bottom-0 right-0 w-4 h-4 p-1 -mx-1 -my-1 text-white bg-blue-600 rounded-full fill-current`}
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z"></path>
                </svg>
              </div>
              <span className="mt-2 text-xs text-pink-600 dark:text-pink-400">
                {miner}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Miners;
