const expres = require("express");
const router = expres.Router();
const todoController = require("../controllers/todo");

router.get("/", todoController.getTodos);
