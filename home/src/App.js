import React, { useEffect, useState } from "react";
import axios from "axios";
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
        </div>
      )}
    </div>
  );
}

export default App;
