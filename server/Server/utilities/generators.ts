import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

require("dotenv").config();
export const generateRandomAlphanumeric = (length: number) => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //abcdefghijklmnopqrstuvwxyz
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset[randomIndex];
  }

  return randomString;
};

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePasswords = async (
  enteredPassword: string,
  hashedPassword: string
) => {
  const passwordsMatch = await bcrypt.compare(enteredPassword, hashedPassword);
  return passwordsMatch;
};

export const generateAuthToken = async (user: LoggedinData, param: object) => {
  try {
    const secretKey = process.env.JSON_KEY as string;
   
    const token = jwt.sign(user, secretKey, param);
    return token;
  } catch (error) {
    throw error;
  }
};

export const verifyAuthToken = async (token: string):Promise<LoggedinData| {audience:string}> => {
  try {
    const secretKey = process.env.JSON_KEY as string; // Replace with a strong secret key
    const data = await jwt.verify(token, secretKey) as LoggedinData;
    return data;
  } catch (error) {
    throw error;
  }
};

const generateRandomBytes = (len: number) => {
  return crypto.randomBytes(len); // 32 bytes for AES-256
};

export const encryptText = (text: string): string => {
  const secretKey = process.env.SECRET_KEY_ENC as string;
  const iv = generateRandomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey),
    Buffer.from(iv)
  );
  let encryptedText = cipher.update(text, "utf8", "hex");
  encryptedText += cipher.final("hex");
  return encryptedText;
};

// Decrypt AES-256 encrypted text using a secret key and IV.
export const decryptText = (encryptedText: string): string => {
  const secretKey = process.env.SECRET_KEY_ENC as string;
  const iv = generateRandomBytes(16);

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey),
    Buffer.from(iv)
  );
  let decryptedText = decipher.update(encryptedText, "hex", "utf8");
  decryptedText += decipher.final("utf8");
  return decryptedText;
};
