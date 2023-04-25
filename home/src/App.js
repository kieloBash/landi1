import React, { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:1337/api/get").then((res) => {
      console.log(res.data);
      setData(res.data);
      setLoading(false);
    });
  }, []);
  return <div className="App"></div>;
}

export default App;
