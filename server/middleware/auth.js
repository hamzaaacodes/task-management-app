const jwt = require("jsonwebtoken");
const key = process.env.SECRET_KEY;

const auth = (request, response, next) => {
  const token = request.header("Auth-token");
  if (!token) {
    response.send("Error");
  }
  const data = jwt.verify(token, key);
    request = data;
  next();
};

module.exports = auth;
