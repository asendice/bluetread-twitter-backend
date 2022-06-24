require("dotenv").config();
const express = require("express");
const routes = require("./routes/auth");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
app.use(express());
app.use(cors());
app.use("/api", routes);


app.listen(port, () => {
  console.log("App is listening on port " + port);
});
