const dbObj = require("../db");
const { connectToDatabase } = dbObj;
const mongoose = require("mongoose");
const Types = mongoose.Types;
const ObjectId = Types.ObjectId;
const tokenUtils = require("./crypto");
const DBCRUD = require("../dbcrud");

async function loginUserUtil(email, password) {
  try {
    const userDBCRUD = new DBCRUD("users");
    await userDBCRUD.initialize();
    //check user exist with email and password
    const user = await userDBCRUD.findOne({ email, password });
    console.log(user);

    if (user) {
      //generate access token
      const { password, ...userInfo } = user;
      const accesstoken = await tokenUtils?.createToken(userInfo);
      //return access token
      return {
        statusCode: 200,
        message: "login successful",
        ...accesstoken,
      };
    } else {
      return {
        statusCode: 401,
        message: "Invalid credentials",
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      message: "something went wrong",
      errors: [error.message],
    };
  }
}

async function signupUserUtil(userInfo) {
  try {
    const userDBCRUD = new DBCRUD("users");
    await userDBCRUD.initialize();
    const { inserted, data: user } = await userDBCRUD.findOneOrCreateOne(
      { email: userInfo.email },
      {},
      userInfo
    );

    if (user) {
      return {
        statusCode: 200,
        user,
        inserted,
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

function updateUserUtil(id, userInfo) {
  console.log({ id, userInfo });

  //save userInfo in DB
  return { statusCode: 200, users: {}, deleted: true };
}

module.exports = { loginUserUtil, signupUserUtil, updateUserUtil };
