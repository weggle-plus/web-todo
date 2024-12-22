const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const extractUserId = (authorizationHeader) => {
  if (!authorizationHeader) {
    return console.error("Authorization header is missing");
  };
  
  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    return console.error("Token is missing");
  };

  const decoded = jwt.decode(token);
  if(!decoded?.id) {
    return console.error("Error decoding token:");
  };

  return decoded.id;
};

const checkUserId = (req, res, next) => {
  const userId = extractUserId(req.headers.authorization);
  if (!userId) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "userId is missing" });
  }
  req.userId = userId;
  next();
};

module.exports = {
  checkUserId,
};