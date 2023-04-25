import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:1337/api/get").then((res) => {
      console.log(res.data.values);
      setData(res.data.values);
      setLoading(false);
    });
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    let file = event.target.files[0];
    setSelectedFile(file);

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
      console.log(d);
    });
  };

  return (
    <div className="App">
      {loading ? (
        <></>
      ) : (
        <div>
          {data.map((row, index) => {
            if (index === 0) {
              return <div key={index}></div>;
            } else {
              return <div key={index}>{row[0]}</div>;
            }
          })}
          <input type="file" onChange={handleFileSelect}></input>
        </div>
      )}
    </div>
  );
}

export default App;
