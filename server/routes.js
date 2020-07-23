const express = require("express");
const router = express.Router();
var path = require("path");

module.exports = function (app) {
  
  // Insert routes below
  app.use("/api/user", require("./api/users"));
  
};
