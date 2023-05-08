import React, { useEffect, useState } from "react";

const Miners = ({ miners, toggleCompute }) => {
  const [searchMiners, setSearchMiners] = useState(miners);
  const [search, setsearch] = useState("");

  useEffect(() => {
    if (search !== "") {
      let temp = [];
      miners.forEach((val) => {
        if (val.toLowerCase() === search.toLowerCase()) {
          temp.push(val);
        }
        setSearchMiners(temp);
      });
    } else {
      setSearchMiners(miners);
    }
    console.log(miners);
  }, [search,miners]);

  return (
    <div className="relative w-full p-4 overflow-hidden bg-white shadow-lg rounded-xl md:w-60 dark:bg-gray-800">
      <p className="mb-6 text-xl text-center font-medium text-gray-600 dark:text-white">
        Miners Today
      </p>
      <div className="max-w-md mx-auto">
        <div className="relative flex items-center w-[11rem] h-10 rounded-lg focus-within:shadow-lg bg-white overflow-hidden mb-4">
          <input
            className="peer h-full w-full outline-none text-sm text-pink-400 pl-2"
            type="text"
            id="search"
            placeholder="Search Miner..."
            onChange={(e) => setsearch(e.target.value)}
          />
          {/* <div className="grid place-items-center h-full w-12 text-pink-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
              onClick={handleSearch}
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                clipRule="evenodd"
              />
            </svg>
          </div> */}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 max-h-[10rem] w-[11rem] overflow-y-auto overflow-x-hidden">
        {searchMiners.map((miner, index) => {
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
                <button
                  className="relative block"
                  onClick={() => toggleCompute(miner)}
                >
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
