import { Request, Response, NextFunction } from "express";
import { verifyAuthToken } from "../utilities/generators";
import makeQueries from "../database";

export const getUserDataMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const token = authHeader.split(" ")[1];

      if (!token) {
        res.status(401).json({
          error: "Invalid Authorisation Format",
          message:
            "You are supposed to include your auth token as: Bearer token",
        });
      }
      const userData = (await verifyAuthToken(token)) as LoggedinData;

      const userIds = await makeQueries(
        `select userId from registeredUsers where username = '${userData.username}'`
      );
      const user = { ...userData, userId: userIds[0].userId };
      if (req.method === "GET") {
        req.headers.user = JSON.stringify(user);
      }
      if (
        req.method === "POST" ||
        req.method === "PATCH" ||
        req.method === "PUT" ||
        req.method === "DELETE"
      ) {
        const body = req.body;
        req.body = { user, data: body };
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
