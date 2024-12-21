const jwt = require("jsonwebtoken");

const extractUserIdFromToken = (authorizationHeader) => {
  if (!authorizationHeader) {
    console.error("Authorization header is missing");
    return null;
  }

  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    console.error("Token is missing in the Authorization header");
    return null;
  }

  try {
    const decoded = jwt.decode(token);
    return decoded?.id || null;
  } catch (err) {
    console.error("Error decoding token:", err.message);
    return null;
  }
};

module.exports = {
  extractUserIdFromToken,
};