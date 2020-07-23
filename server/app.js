var path = require("path");
var dotenv = require("dotenv").config(path.resolve(process.cwd(), "./.env"));
const port = process.env.PORT || 3210;
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

require("./routes")(app);

//   job.start();

app.listen(port, () => {
  console.log("Server is running at port " + port);
});
exports = module.exports = app;
