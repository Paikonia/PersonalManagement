import { Request, Response, NextFunction } from "express";
import { verifyAuthToken } from "../utilities/generators";
import makeQueries from "../database";
import { AUTHERRORS } from "../Constants/AuthConstants";

export const getUserDataMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if(req.url.includes('auth')) return next()
    const authHeader = req.headers["authorization"];
    if(!authHeader) return next(AUTHERRORS.MissingToken);

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      if (!token) {
        next(AUTHERRORS.InvalidTokenFormat)
      }
      const userData = (await verifyAuthToken(token)) as LoggedinData;

      const userIds = await makeQueries(
        `select userId from registeredUsers where username = '${userData.username}'`
      );
      if(userIds.length === 0) {
        const error:ServerExceptions ={
          name: 'Invalid user',
          message: 'The user you are logged in as is not in our database',
          status: 404
        }
        throw error
      }
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
