require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
app.use(express());
app.use(cors());


app.listen(port, () => {
  console.log("App is listening on port " + port);
});
