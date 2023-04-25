import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function FileUpload({ toggleMobileData }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState([]);

  const handleFileSelect = (event) => {
    let file = event.target.files[0];
    setSelectedFile(file);
    console.log(selectedFile);

    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      // console.log(d);
      setData(d);
    });
  };

  function toggleMobile() {
    if (data.length > 0) {
      toggleMobileData(data);
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileSelect}></input>
      <button
        type="button"
        onClick={toggleMobile}
        className="py-4 px-6  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
      >
        Upload File
      </button>
    </div>
  );
}
