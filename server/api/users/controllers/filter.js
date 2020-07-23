var Services = require("../../../services/network");
const fs = require("fs");

const filter = async (req, res, next) => {
  try {
    const b = "/var/log/nginx/access.log";

    // READ THE NGINX ACCESS LOG

    fs.readFile(b, "utf8", (err, contents) => {
      if (err) {
        return Services._validationError(
          res,
          err,
          "Permission denied in reading the nginx log"
        );
      }

      // SORT THE DATA IN THE DESCENDING ORDER 
      let data = contents.toString().split(/\n/).reverse();
      if (req.body.key) {
        req.body.bata = data.filter((e) => e.includes(req.body.key));
      } else {
        req.body.bata = data;
      }
      Services._response(res, req.body.bata, "Nginx list fetched successfully");
    });
  } catch (error) {
    Services._handleError(res, error.message);
  }
};
module.exports = { filter };
