const jwt = require("jsonwebtoken");

module.exports.getFileExtension = function getFileExtension(filename) {
  const parts = filename.split(".");
  if (parts.length > 1) {
    return parts.pop();
  } else {
    return null; // or return an empty string or a default value if you prefer
  }
};

module.exports.getUserFromToken = function (idToken) {
  // Decoding the token without verifying it. Cognito has already verified it.
  const decoded = jwt.decode(idToken, { complete: true });
  return decoded.payload;
};
