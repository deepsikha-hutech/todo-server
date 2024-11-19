const crypto = require("./crypto");

async function verifyUserToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }
  try {
    crypto
      .verifyToken(token)
      .then((decoded) => {
        req.user = decoded;
        next();
      })
      .catch((err) => {
        console.log(err);
        return res.status(401).json({ message: "Invalid token" });
      });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = { verifyUserToken };
