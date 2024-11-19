const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 3000;
const v1Routes = require("./routes/v1/v1.main");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.send(`Server is running at port ${PORT}`);
});

app.use("/api/v1", v1Routes);
// app.use("/api/v2", v2Routes);

app.listen(3000, () => {
  console.log(`Server is running at port ${PORT}`);
});
