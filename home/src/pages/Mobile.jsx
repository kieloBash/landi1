import React, { useEffect, useState } from "react";
// import axios from "axios";
// import AddMiner from "../components/Modals";
// import MineNumberComponent from "../components/MineNumberComponent";
import TotalPrice from "../components/TotalPrice";
import Miners from "../components/Miners";
import Hero from "../components/Hero";
import CopiedPrompt from "../components/CopiedPrompt";
import AddMinerMobile from "../components/AddMinerMobile";

import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';

const Mobile = () => {
  const [data, setData] = useState([]);
  const [no_items, setNoItems] = useState(0);
  const [mineNumbers, setMineNumbers] = useState([]);
  const [miners, setMiners] = useState([]);
  const [total, setTotal] = useState(0);
  const [copied, setCopied] = useState(false);

  const [loading, setLoading] = useState(true);

  const EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  useEffect(() => {
    let temp = [];
    let tempTotal = 0;
    let tempMiners = [];
    
    for (let i = 0; i < data.length; i++) {
      if (i !== 0) {
        tempMiners.push(data[i].Recipient);
        temp.push(data[i].MineNumber);
        tempTotal += Number(data[i].Price);
      }
    }
    setMineNumbers(temp);
    setTotal(tempTotal);

    const uniqueArray = [...new Set(tempMiners)];
    setMiners(uniqueArray);
    setNoItems(data.length - 1);
  }, [data]);

  const handleAdd = (input) => {
    let newArray = {
      Recipient: input.recipient,
      // MineNumber: input.mineNumber,
      Price: input.price,
    };
    setData((prevArray) => [...prevArray, newArray]);
    console.log(data);
    console.log(mineNumbers);
  };

  const toggleCompute = (name) => {
    let mine = [];
    let prices = [];
    let total = 0;

    data.forEach((miner) => {
      if (miner.Recipient === name) {
        mine.push(miner.MineNumber);
        prices.push(miner.Price);
        total += Number(miner.Price);
      }
    });

    const copyToClipboard = (text) => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          console.log(`Copied "${text}" to clipboard`);
          setCopied(true);
        })
        .catch((error) =>
          console.error(`Error copying "${text}" to clipboard:`, error)
        );
    };

    let pricesText = "";
    let j = 0;
    prices.forEach((price) => {
      if (j === prices.length - 1) {
        pricesText += ` ${price}`;
      } else {
        pricesText += ` ${price} +`;
      }
      j++;
    });

    const textToCopy = `${name}:${pricesText} = ${total}`;
    copyToClipboard(textToCopy);

    console.log(mine, prices, total);
  };

  const toggleClose = () => {
    setCopied(!copied);
  };

  const toggleMobileData = (mobileData) => {
    console.log(mobileData);
    setData(mobileData);
    setLoading(false);
  };

  const downloadAsExcel = () => {
    if (data) {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = {
        Sheets: {
          data: worksheet,
        },
        SheetNames: ["data"],
      };
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      console.log(excelBuffer);
      saveAsExcel(excelBuffer, "LizBoutique");
    }
  };

  const saveAsExcel = (buffer, filename) => {
    const datas = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(datas,filename+'_export_'+new Date().getTime()+'.xlsx');
  };
  return (
    <div className="App flex justify-center items-center bg-pink-300 w-screen h-screen">
      {loading && data ? (
        <div>
          <Hero toggleMobileData={toggleMobileData} />
        </div>
      ) : (
        <div className="flex w-full justify-evenly items-center flex-col md:flex-row h-full">
          <div className="grid grid-cols-1 gap-y-4">
            <TotalPrice total={total} no_items={no_items} />
          </div>
          <div>
            <Miners miners={miners} toggleCompute={toggleCompute} />
          </div>
          <div className="flex">
            <AddMinerMobile handleAdd={handleAdd} miners={miners}/>

            <button
              type="button"
              onClick={downloadAsExcel}
              className="ml-2 py-2 px-4 flex justify-center items-center  bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  w-12 h-12 rounded-lg "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* <MineNumberComponent mineNumbers={mineNumbers} /> */}
          </div>

          {copied ? (
            <div className="absolute h-screen w-screen flex justify-center items-center bg-pink-300">
              <CopiedPrompt toggleClose={toggleClose} />
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default Mobile;
