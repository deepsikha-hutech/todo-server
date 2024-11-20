const express = require("express");
const router = express.Router();
const authV1Utils = require("../../utils/v1/auth");
const {
  verifyUserToken,
  validatePayload,
} = require("../../utils/v1/middleware");
const { SIGNUP_RULE, LOGIN_RULE } = require("../../utils/v1/validationrules");

// define the home page route
router.post(
  "/signup",

  validatePayload({ rule: SIGNUP_RULE }),
  async (req, res) => {
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
  }
);

// define the home page route
router.post(
  "/signin",
  validatePayload({ rule: LOGIN_RULE }),
  async (req, res) => {
    const { email, password } = req?.body;
    const { statusCode, ...rest } = await authV1Utils?.loginUserUtil(
      email,
      password
    );
    res.status(statusCode).json(rest);
  }
);

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
