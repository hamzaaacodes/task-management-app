const express = require("express");
const router = express.Router();
const {signUp, logIn} = require("../../controller/users/usersController");

router.route("/signup").post(signUp);
router.route("/login").post(logIn);


module.exports = router;