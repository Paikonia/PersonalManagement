interface RegisterUser {
  name: string;
  username: string;
  email: string;
  mobile: string;
  password: string;
}

interface DBUser {
  name: string;
  username: string;
  email: string;
  mobile: string;
}

interface SessionData {
  session: String;
  success: Boolean;
  name: String;
}

interface LoggedInUser {
  user: String;
  refreshToken: String;
  userToken: String;
  requireConfirmation: SessionData | null;
}

interface LoggedinData {
  username: string;
  userId: string;
  email: string;
  mobile: string;
  name:string
}
