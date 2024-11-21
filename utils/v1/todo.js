const dbObj = require("../db");
const { connectToDatabase } = dbObj;
const mongoose = require("mongoose");
const Types = mongoose.Types;
const ObjectId = Types.ObjectId;
const tokenUtils = require("./crypto");
const DBCRUD = require("../dbcrud");

async function createTodo(todoInfo) {
  try {
    const todoDBCRUD = new DBCRUD("todo");
    await todoDBCRUD.initialize();
    const { acknowledged, insertedId } = await todoDBCRUD.insertOne(todoInfo);
    if (acknowledged && insertedId) {
      return {
        statusCode: 200,
        todo: { ...todoInfo, _id: insertedId },
        message: "todo created successfully",
      };
    } else {
      return {
        statusCode: 500,
        message: "something went wrong",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "something went wrong",
      errors: [error.message],
    };
  }
}

async function getAllTodo(page, limit, search) {
  try {
    console.log({ page, limit, search });
    const todoDBCRUD = new DBCRUD("todo");
    await todoDBCRUD.initialize();
    let searchQuery = {};
    if (search) {
      searchQuery = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };
    }
    const skip = (+page - 1) * limit;
    console.log({ skip });
    const { rows = [], totalCount = 0 } = await todoDBCRUD.findAndCountAll(
      searchQuery,
      null,
      skip,
      +limit
    );

    return {
      statusCode: 200,
      todo: rows,
      totalCount,
      message: "todo found successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "something went wrong",
      errors: [error.message],
    };
  }
}

async function getTodobyId(id) {
  try {
    const todoDBCRUD = new DBCRUD("todo");
    await todoDBCRUD.initialize();
    const todo = await todoDBCRUD.findById(id);

    console.log({ todo });

    if (todo) {
      return {
        statusCode: 200,
        todo,
        message: "todo found successfully",
      };
    } else if (!todo) {
      return {
        statusCode: 400,
        message: "todo not found",
      };
    } else {
      return {
        statusCode: 500,
        message: "something went wrong",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "something went wrong",
      errors: [error.message],
    };
  }
}

async function updateTodobyId(id, updateInfo) {
  try {
    const todoDBCRUD = new DBCRUD("todo");
    await todoDBCRUD.initialize();
    const { acknowledged, modifiedCount, matchedCount } =
      await todoDBCRUD.updateById(id, updateInfo);
    if (acknowledged && matchedCount) {
      return {
        statusCode: 200,
        todo: { ...updateInfo, _id: id },
        message: "todo updated successfully",
      };
    } else if (matchedCount === 0) {
      return {
        statusCode: 400,
        message: "todo not found",
      };
    } else {
      return {
        statusCode: 500,
        message: "something went wrong",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "something went wrong",
      errors: [error.message],
    };
  }
}

async function deleteTodobyId(id) {
  try {
    const todoDBCRUD = new DBCRUD("todo");
    await todoDBCRUD.initialize();
    const { acknowledged, deletedCount } = await todoDBCRUD.deleteById(id);
    console.log("Acknowledged:", acknowledged, "DeletedCount:", deletedCount);
    if (acknowledged && deletedCount > 0) {
      return {
        statusCode: 200,
        todo: { _id: id },
        message: "todo deleted successfully",
      };
    } else if (deletedCount === 0) {
      return {
        statusCode: 400,
        message: "todo not found",
      };
    } else {
      return {
        statusCode: 500,
        message: "something went wrong",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      message: "something went wrong",
      errors: [error.message],
    };
  }
}

module.exports = {
  createTodo,
  getAllTodo,
  getTodobyId,
  updateTodobyId,
  deleteTodobyId,
};
