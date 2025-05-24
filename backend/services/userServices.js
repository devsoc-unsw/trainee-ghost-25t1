const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Handles the signup process by validating and clearning up user inputs, then
 * adds the user to the database and creates a JSON Web Token
 *
 * @param {Object} userData - Core information about the user
 * @param {string} user.name - The user's username
 * @param {string} user.email - The user's email address.
 * @param {string} user.password - The unhashed password of a user
 * @returns {Promise<Object>} An object containing a user object and the token
 * which the user can ligin with
 */

exports.signup = async ({ email, name, password }) => {
  // Handle cases where the JWT secret can't be found
  if (!JWT_SECRET) {
    const err = new Error("Missing JWT_SECRET enviromental variable");
    err.code = "CONFIG_ERROR";
    throw err;
  }

  // Check if all necessary inputs exist
  if (!name || !email || !password) {
    const err = new Error("Email, name and password are required");
    err.code = "INVALID_INPUT";
    throw err;
  }

  // Remove any whitespace on the sides of non-password inputs
  name = name.trim();
  email = email.trim();

  // Make sure the user dosent already exist
  const existing = await userModel.emailToId(email);
  if (existing) {
    const err = new Error("User already exists");
    err.code = "USER_EXISTS";
    throw err;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 11);

  // Add the user to the database
  const id = await userModel.createUser({
    name,
    email,
    password: hashedPassword,
  });

  // Generate a JSON Web Token
  const token = jwt.sign(
    // Payload of what the token should contain
    { email, name, id },
    JWT_SECRET,
    // The refresh time is kind of long for this project because security is
    // not really our main focus rn. We can change later though
    { expiresIn: "50h" }
  );

  const user = { id, name, email };

  return { user, token };
};

/**
 * Handles the login process by validating and cleaning up user inputs, then
 * authenticates the user and generates a JSON Web Token
 *
 * @param {Object} credentials - Core login information for the user
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's unhashed password.
 * @returns {Promise<Object>} An object containing a user object and the token
 * which the user can login with
 */

exports.login = async ({ email, password }) => {
  // Handle cases where the JWT secret can't be found
  if (!JWT_SECRET) {
    const err = new Error("Missing JWT_SECRET enviromental variable");
    err.code = "CONFIG_ERROR";
    throw err;
  }

  // Check if all necessary inputs exist
  if (!email || !password) {
    const err = new Error("Email and password are required");
    err.code = "INVALID_INPUT";
    throw err;
  }

  // Remove any whitespace on the sides of non-password inputs
  email = email.trim();

  // Find the user and throw and error if they dont exist
  const id = await userModel.emailToId(email);
  if (!id) {
    const err = new Error("User not found");
    err.code = "USER_NOT_FOUND";
    throw err;
  }

  // Password comparison logic and data retrieval
  const { hashed_password, name } = await userModel.getData(id, [
    "hashed_password",
    "name",
  ]);
  const isMatch = await bcrypt.compare(password, hashed_password);
  if (!isMatch) {
    const err = new Error("Invalid credentials");
    err.code = "INVALID_CREDENTIALS";
    throw err;
  };

  const token = jwt.sign(
    // Payload of what the token should contain
    { email, name, id },
    JWT_SECRET,
    { expiresIn: "50h" }
  );

  const user = { id, name, email };

  return { user, token };
};

exports.getUser = async (userId) => {
  const user = await userModel.getUserData(userId);
  return user;
}

exports.getNofitications = async (userId) => {
  return await userModel.getNotifications(userId);
}

exports.closeNotifications = async (userId, taskId) => {
  return await userModel.closeNotification(userId, taskId);
}