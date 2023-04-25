const express = require("express");

const cors = require("cors");
const app = express();
const routes = require("./routes/route");

app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.listen(1337, (req, res) => console.log("running at 1337"));
