var Services = require("../../../services/network");
const path = require("path");
const fs = require("fs");
const os = require("os");

const listnginx = async (req, res, next) => {
  try {
    const b = "/var/log/nginx/access.log";

   //READ THE NGINX ACCESS LOG

    fs.readFile(b, "utf8", (err, contents) => {
      if (err) {
        return Services._validationError(
          res,
          err,
          "Permission denied in reading the nginx log"
        );
      }
      Services._response(
        res,
        contents.toString().split(/\n/).reverse(),
        "Nginx list fetched successfully"
      );
    });
  } catch (error) {
    Services._handleError(res, error.message);
  }
};
module.exports = { listnginx };
