require("dotenv").config();
const usersModel = require("../../models/users/usersModel");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const SECRET_KEY = "hamzaacodes";
const key = process.env.SECRET_KEY;

// Get token
const getToken = (id) => {
  var token = jwt.sign({ id }, key,{expiresIn:"12h"});
  return token;
};

// Sign up
const signUp = async (request, response) => {
  const { password } = request.body;
  const hashedPassword = await bycript.hash(password, 2);

  const data = await usersModel.create({
    ...request.body,
    password: hashedPassword,
  });

  response.json({ message: "User Sign up Sucessfully!", user: data });
};

// Log in
const logIn = async (request, response) => {
  const { email, password } = request.body;
  // Validation
  if (email === "") {
    response.status(401);
    throw new Error("Email field cannot be empty!");
  } else {
    if (password === "") {
      response.status(401);
      throw new Error("Password field cannot be empty!");
    }
  }
  // Find user in db
  const user = await usersModel.findOne({ email });
  // Validate password
  if (user && (await bycript.compare(password, user.password))) {
    const authToken = getToken(user._id);
    response.status(200).json({
      success: true,
      userId: user._id,
      name: user.firstName + " " + user.lastName,
      token: authToken,
    });
  } else {
    response.send("Invalid credentials!");
  }
};

module.exports = { signUp, logIn };
