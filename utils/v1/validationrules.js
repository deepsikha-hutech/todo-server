const SIGNUP_RULE = {
  name: {
    mandatory: true,
    allowNull: false,
    type: "string",
    minLength: 3,
    minLengthError: "Name must have minimum 3 characters.",
  },
  email: {
    type: "email",
    mandatory: false,
    allowNull: false,
  },
  password: {
    mandatory: true,
    allowNull: false,
    type: "string",
  },
};

const LOGIN_RULE = {
  email: {
    mandatory: true,
    allowNull: false,
    type: "string",
  },
  password: {
    mandatory: true,
    allowNull: false,
    type: "string",
  },
};

const NEW_TODO_RULE = {
  title: {
    mandatory: true,
    allowNull: false,
    type: "string",
    minLength: 3,
  },
  description: {
    type: "string",
    mandatory: false,
    allowNull: false,
  },
  addedOn: {
    mandatory: false,
    allowNull: false,
    type: "string",
  },
  deadLine: {
    mandatory: true,
    allowNull: false,
    type: "string",
  },
};

const UPDATE_TODO_RULE = {
  title: {
    mandatory: false,
    allowNull: false,
    type: "string",
    minLength: 3,
  },
  description: {
    type: "string",
    mandatory: false,
    allowNull: false,
  },
  deadLine: {
    mandatory: false,
    allowNull: false,
    type: "string",
  },
};

module.exports = { SIGNUP_RULE, LOGIN_RULE, NEW_TODO_RULE, UPDATE_TODO_RULE };
