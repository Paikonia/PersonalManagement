import { Response, Request, NextFunction } from "express";
import {
  resetCodeHandler,
  resetPasswordHandler,
  resetStartHandler,
  signin,
  refreshHandler,
  signup,
  verifyEmail,
  signoutHandler,
} from "./handlers";
import { verifyAuthToken } from "../utilities/generators";

export const signinController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    if (
      !body.user ||
      !body.password ||
      body.user === "" ||
      body.password === ""
    ) {
      throw new Error(
        "You must provide both a username and password to make this request"
      );
    }

    const data = await signin(body.user, body.password);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, username, email, mobile, password, confirmPassword } =
      req.body;
    if (
      !(
        firstName &&
        firstName.trim() !== "" &&
        lastName &&
        lastName.trim() !== "" &&
        username &&
        username.trim() !== "" &&
        email &&
        email.trim() !== "" &&
        password &&
        password.trim() !== ""
      )
    ) {
      throw new Error(
        "The fields name, username, email, password, confirmPassword are required"
      );
    }
    if (password !== confirmPassword) {
      throw new Error("The password do not match.");
    }
    const session = await signup({ firstName, lastName, username, email, mobile, password });

    res.json({ session });
  } catch (error) {
    next(error);
  }
};

export const verifyUserEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { session, code } = req.body;
    if (!(session && session.trim() !== "" && code && code.trim() !== "")) {
      throw new Error("Both the session and code are required!");
    }
    const ret = await verifyEmail(session, code);
    res.json(ret);
  } catch (error) {
    next(error);
  }
};

export const resetStartController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body.user;
    const g = await resetStartHandler(user);
    res.json(g);
  } catch (error) {
    next(error);
  }
};

export const resetCodeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { session, code } = req.body;
    const data = await resetCodeHandler(session, code);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { session, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      throw new Error("The password you have entered do not match");
    }

    const result = await resetPasswordHandler(session, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const refreshController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;

    const data = (await verifyAuthToken(body.refreshToken)) as {
      audience: string;
    };
    const result = await refreshHandler(data.audience, body.refreshToken);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const signoutController = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const {refreshToken} = req.body;
    const data = await verifyAuthToken(refreshToken)
    const { audience } = data as unknown as { audience:string };
    
    const result = await signoutHandler(audience, refreshToken)
    res.json(result)
  } catch (error) {
    next(error);
  }
}