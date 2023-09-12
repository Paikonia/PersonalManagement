const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

function generateRandomAlphanumeric(length) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset[randomIndex];
  }

  return randomString;
}

async function hashPassword(password) {
  const saltRounds = 14;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePasswords(enteredPassword, hashedPassword) {
  const passwordsMatch = await bcrypt.compare(enteredPassword, hashedPassword);
  return passwordsMatch;
}

const generateAuthToken = async (user, param) => {
  const secretKey = "your_secret_key"; // Replace with a strong secret key

  const token = jwt.sign(user, secretKey, param);
  return token;
};

const verifyAuthToken = async (token) => {
  const secretKey = "your_secret_key"; // Replace with a strong secret key

  const data = await jwt.verify(token, secretKey);
  return data;
};

module.exports = {
  generateRandomAlphanumeric,
  hashPassword,
  comparePasswords,
  generateAuthToken,
  verifyAuthToken
};
