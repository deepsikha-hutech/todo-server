var jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_PRIVATE_KEY;

async function createToken(userInfo) {
  return new Promise((resolve, reject) => {
    jwt.sign(userInfo, privateKey, { expiresIn: "24h" }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve({ token });
      }
    });
  });
}

async function verifyToken(token) {
  return new Promise((resolve, reject) => {
    try {
      const decoded = jwt.verify(token, privateKey);
      resolve(decoded);
    } catch (error) {
      console.log("ERROR OCCURED :", error);
      reject({ message: "Invalid/Expired access token" });
    }
  });
}

module.exports = { createToken, verifyToken };
