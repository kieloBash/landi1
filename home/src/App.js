import React, { useEffect, useState } from "react";
import axios from "axios";
import AddMiner from "./components/Modals";
import Table from "./components/Table";
import MineNumberComponent from "./components/MineNumberComponent";
import TotalPrice from "./components/TotalPrice";
import Miners from "./components/Miners";
// import FileUploadExcel from "./components/FileUploadExcel";

function App() {
  const [data, setData] = useState([]);
  const [no_items, setNoItems] = useState(0);
  const [mineNumbers, setMineNumbers] = useState([]);
  const [miners, setMiners] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:1337/api/get").then((res) => {
      // console.log(res.data.values);
      setData(res.data.values);
      setNoItems(res.data.values.length - 1);

      if (res.data.values) {
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    let temp = [];
    let tempTotal = 0;
    let tempMiners = [];

    for (let i = 0; i < data.length; i++) {
      if (i !== 0) {
        tempMiners.push(data[i][0]);
        temp.push(data[i][1]);
        tempTotal += Number(data[i][2]);
      }
    }
    setMineNumbers(temp);
    setTotal(tempTotal);

    const uniqueArray = [...new Set(tempMiners)];
    setMiners(uniqueArray);
    
    
  }, [data]);

  const handleAdd = (input) => {
    let newArray = [input.recipient, input.mineNumber, input.price];
    setData((prevArray) => [...prevArray, newArray]);
  };

  const toggleCompute = (name) => {
    let mine = [];
    let prices = [];
    let total = 0;

    data.forEach(miner => {
      if(miner[0]===name){
        mine.push(miner[1]);
        prices.push(miner[2]);
        total += Number(miner[2]);
      }
    });

    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text)
        .then(() => console.log(`Copied "${text}" to clipboard`))
        .catch((error) => console.error(`Error copying "${text}" to clipboard:`, error));
    };

    const textToCopy = `${name}: ${prices} = ${total}`;
    copyToClipboard(textToCopy);
    
    console.log(mine,prices,total);
  }

  return (
    <div className="App flex justify-center items-center bg-blue-300 w-screen h-screen">
      {loading ? (
        <></>
      ) : (
        <div className="flex w-full justify-evenly items-center flex-col md:flex-row">
          <div>
            <MineNumberComponent mineNumbers={mineNumbers} />
          </div>

          <div className="grid grid-cols-1 gap-y-4">
            <AddMiner handleAdd={handleAdd}/>
            <TotalPrice total={total} no_items={no_items} />
          </div>

          <div>
            <Miners miners={miners} toggleCompute={toggleCompute}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
