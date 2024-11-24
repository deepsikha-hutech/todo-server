const { response } = require("express");
const crypto = require("./crypto");

// const validateSignup = (req, res, next) => {
//   const result = validatePayload({ body: req.body, rule: signupRule });
//   const { statusCode, ...response } = perfectPayloadV1(req?.body, rule);
//   if (result === true) {
//     next();
//   } else {
//     res.status(400).json(result);
//   }
// };

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

const validatePayload = ({ rule }) => {
  return async (req, res, next) => {
    try {
      const { perfectPayloadV1 } = await import("perfect-payload");

      const { statusCode, ...response } = perfectPayloadV1(req?.body, rule);

      if (+statusCode >= 200 && +statusCode <= 299) {
        return next();
      } else {
        return res.status(statusCode).json(response);
      }
    } catch (error) {
      console.error("Error during validation:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

module.exports = { verifyUserToken, validatePayload };
