const express = require("express");
const router = express.Router();
const authV1Controllers = require("../../controller/v1/auth");
const todoV1Controllers = require("../../controller/v1/todo");

router.use("/auth", authV1Controllers);
router.use("/todo", todoV1Controllers);

module.exports = router;
