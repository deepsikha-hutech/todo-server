const express = require("express");
const router = express.Router();
const todoV1Utils = require("../../utils/v1/todo");
const mongoose = require("mongoose");
const { route } = require("./auth");
const Types = mongoose.Types;
const ObjectId = Types.ObjectId;

// define the home page route
router.post("/add", async (req, res) => {
  try {
    const { statusCode, ...response } = await todoV1Utils?.createTodo({
      ...req?.body,
      userId: ObjectId.createFromHexString(req?.user?._id),
    });
    res.status(statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      error: [error?.message?.replaceAll("'")],
      message: "Internal Server Error",
    });
  }
});

router.put("/update/:id", async (req, res) => {
  const { id } = req?.params;
  try {
    const { statusCode, ...response } = await todoV1Utils?.updateTodobyId(
      id,
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

router.delete("/delete/:id", async (req, res) => {
  const { id } = req?.params;
  try {
    const { statusCode, ...response } = await todoV1Utils?.deleteTodobyId(
      id,
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

router.get("/get/:id", async (req, res) => {
  const { id } = req?.params;
  try {
    console.log({ id });
    const { statusCode, ...response } = await todoV1Utils?.getTodobyId(id);
    res.status(statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      error: [error?.message?.replaceAll("'")],
      message: "Internal Server Error",
    });
  }
});

router.get("/getall", async (req, res) => {
  try {
    const { page = 1, limit = 10, search = null } = req?.query;
    const { statusCode, ...response } = await todoV1Utils?.getAllTodo(
      page,
      limit,
      search
    );
    res.status(statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      error: [error?.message?.replaceAll("'")],
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
