import React, { useEffect, useState } from "react";
import axios from "axios";
import AddMiner from "../components/Modals";
import MineNumberComponent from "../components/MineNumberComponent";
import TotalPrice from "../components/TotalPrice";
import Miners from "../components/Miners";
// import Hero from "../components/Hero";
import CopiedPrompt from "../components/CopiedPrompt";

const Desktop = () => {
    const [data, setData] = useState([]);
    const [no_items, setNoItems] = useState(0);
    const [mineNumbers, setMineNumbers] = useState([]);
    const [miners, setMiners] = useState([]);
    const [total, setTotal] = useState(0);
    const [copied, setCopied] = useState(false);
  
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
  
      data.forEach((miner) => {
        if (miner[0] === name) {
          mine.push(miner[1]);
          prices.push(miner[2]);
          total += Number(miner[2]);
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
        if (j === prices.length-1) {
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
  
    // const toggleMobileData = (mobileData) => {
    //   console.log(mobileData)
    //   setData(mobileData);
    //   setLoading(false);
    // }
  
    return (
      <div className="App flex justify-center items-center bg-pink-300 w-screen h-screen">
        {loading && data ? (
        //   <div>
        //     <Hero toggleMobileData={toggleMobileData}/>
        //   </div>
        <div>Hi bb loading pa wait lang</div>
        ) : (
          <div className="flex w-full justify-evenly items-center flex-col md:flex-row">
            <div>
              <MineNumberComponent mineNumbers={mineNumbers} />
            </div>
  
            <div className="grid grid-cols-1 gap-y-4">
              <AddMiner handleAdd={handleAdd} />
              <TotalPrice total={total} no_items={no_items} />
            </div>
  
            <div>
              <Miners miners={miners} toggleCompute={toggleCompute} />
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
}

export default Desktop