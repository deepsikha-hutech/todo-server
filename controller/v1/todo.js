const express = require("express");
const router = express.Router();
const authV1Utils = require("../../utils/v1/auth");

// define the home page route
router.post("/add", (req, res) => {
  try {
    const { statusCode, ...response } = authV1Utils?.signupUser(req?.body);
    res.status(statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      error: [error?.message?.replaceAll("'")],
      message: "Internal Server Error",
    });
  }
});

router.get("/", (req, res) => {
  const { id, name, dhdhd, jkjaj } = req?.params;
  const { statusCode, ...rest } = userV1Utils?.deleteUser(req?.params?.id);
  res.status(statusCode).json(rest);
});

router.get("/:id", (req, res) => {
  const { id, name, dhdhd, jkjaj } = req?.params;
  const { statusCode, ...rest } = userV1Utils?.deleteUser(req?.params?.id);
  res.status(statusCode).json(rest);
});

module.exports = router;
