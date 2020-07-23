const express = require("express");
const router = express.Router();

const {signup}=require("./controllers/signup")
const { verifyuser } = require("./controllers/verifyUser");
const { resendOtp } = require("./controllers/resendOTP");
const { login } = require("./controllers/login");
const { listnginx } = require("./controllers/listnginx");
const { filter } = require("./controllers/filter");
const userAuth11 = require("../../middlewares/userAuth11");


router.post("/signup",signup)
router.post("/verifyuser", verifyuser);
router.post("/resendOtp", resendOtp);
router.post("/login", login);
router.get("/listnginx", userAuth11,listnginx);
router.post("/filter", userAuth11, filter);


module.exports = router;


