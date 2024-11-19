const express = require("express");
const router = express.Router();
const authV1Utils = require("../../utils/v1/auth");
const { verifyUserToken } = require("../../utils/v1/middleware");

// define the home page route
router.post("/signup", async (req, res) => {
  try {
    const { statusCode, ...response } = await authV1Utils?.signupUserUtil(
      req?.body
    );
    res.status(statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      error: [error?.message?.replaceAll("'")],
      message: "Internal Server Error",
    });
  }
});

// define the home page route
router.post("/signin", async (req, res) => {
  const { email, password } = req?.body;
  const { statusCode, ...rest } = await authV1Utils?.loginUserUtil(
    email,
    password
  );
  res.status(statusCode).json(rest);
});

router.put("/user/update", verifyUserToken, async (req, res) => {
  try {
    const { statusCode, ...response } = authV1Utils?.updateUserUtil(req?.body);
    console.log({ statusCode });
    res.status(statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      error: [error?.message?.replaceAll("'")],
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
