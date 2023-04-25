import React, { useEffect, useState } from "react";

import Desktop from "./pages/Desktop";
import Mobile from "./pages/Mobile";

function App() {
  const [choice, setChoice] = useState(0);

  const toggleChoice = (i) => {
    setChoice(i);
  };

  return (
    <div className="App flex justify-center items-center bg-pink-300 w-screen h-screen">
      {choice === 0 ? (
        <>
          <div className="flex flex-col md:flex-row">
            <div className="inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={(e) => toggleChoice(1)}
                className="mr-0 mb-5 md:mb-0 md:mr-5 py-2 px-4 flex items-center bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-36 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
                <h1 className="mb-[3px] ml-[5px]">Laptop</h1>
              </button>
            </div>
            <div className="inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={(e) => toggleChoice(2)}
                className="py-2 px-4 flex items-center bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-36 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
                <h1 className="mb-[3px] ml-[5px]">Mobile</h1>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>{choice === 1 ? <><Desktop></Desktop></> : <><Mobile></Mobile></>}</>
      )}
    </div>
  );
}

export default App;
