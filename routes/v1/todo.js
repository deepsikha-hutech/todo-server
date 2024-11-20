const expres = require("express");
const router = expres.Router();
const todoController = require("../controllers/todo");
const validatePayload = require("../v1/middlewares/validate-payload");

router.get("/", todoController.getTodos);

router.post(
  "/payload-validation",
  validatePayload({ rule: { type: "string", required: true, minLength: 3 } }),
  (req, res) => res.send("OK")
);

// router.post(
//     "/payload-validation",
//     validatePayload({ rule: <your validation rule json object> }),
//     (req, res) => res.send("OK")
//   );
