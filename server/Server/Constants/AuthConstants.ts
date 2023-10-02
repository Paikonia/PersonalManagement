export const AUTHERRORS: { [key: string]: ServerExceptions } = {
  IncorrectPassword: {
    name: "Incorrect Password",
    message: "The password you have entered is incorrect",
    status: 401,
  },
  InvalidTokenFormat: {
    name: "Invalid Token Format",
    message:
      "The token format you have entered is incorrect. Make sure it is Bearer <token>.",
    status: 400,
  },
  MissingData: {
    name: "Missing Data",
    message: "",
    status: 400,
  },
  PasswordMissmatch: {
    name: "Password Missmatch",
    message: "Both password and confirm password must much.",
    status: 401,
  },
  MissingUser: {
    name: "Missing User",
    message:
      "The user you have entered is not in our database. Please cross check that your information is correct",
    status: 404,
  },
  InvalidEmail: {
    name: "Invalid Email",
    message: "The email you have entered is invalid.",
    status: 400,
  },
  PasswordCriteria: {
    name: "Password Too Week",
    message:
      "The password must be eight characters long, contain atleast 1 uppercase, lowercase, number and a special character !#?()$%£",
    status: 400,
  },
  IncorrectCode: {
    name: "Incorrect Code",
    message: "The code you sent is incorrect",
    status: 401,
  },
  InvalidSession: {
    name: "Invalid Session",
    message: "The session you have sent is invalid.",
    status: 400,
  },
  IncorrectRefreshToken: {
    name: "Incorrect Refresh Token",
    message:
      "Invalid refresh Token. Make sure the code you have sent is correct",
    status: 401,
  },
  MissingToken: {
    name: "Missing Access Token",
    message:"Missing authentication token",
    status: 401,
  },
};
