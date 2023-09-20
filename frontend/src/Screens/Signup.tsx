import { Card } from "../Components/ui/card";
import LabelledInput from "../Components/LabelledInput";
import { Button } from "../Components/ui/button";
import { RegisterUser, useAuthContext } from "../Contexts/authContext";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const { signup } = useAuthContext();
  const [signupData, setSignupData] = useState<RegisterUser>({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    name: "",
    mobile: ""
  });
  const handleOnInputChange = (e: any) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignin = () => {
    signup(signupData);
  };
  return (
    <div className="w-full h-full flex bg-gray-100 justify-center p-12 items-center">
      <Card className="w-8/12 shadow-2xl">
        <img
          className="w-42 h-36 mx-auto"
          src={require("../Resources/aikos-logo.png")}
          alt="Logo"
        />

        <LabelledInput
          label="Name"
          id="name"
          className="mb-2"
          placeholder="Name....."
          name="name"
          value={signupData.name}
          onChange={handleOnInputChange}
        />
        <LabelledInput
          label="Username or email"
          id="username"
          className="mb-2"
          placeholder="Username"
          name="username"
          value={signupData.username}
          onChange={handleOnInputChange}
        />
        <LabelledInput
          label="Email"
          id="email"
          className="mb-2"
          placeholder="Email....."
          name="email"
          value={signupData.email}
          onChange={handleOnInputChange}
        />
        <LabelledInput
          label="Phone"
          id="mobile"
          className="mb-2"
          placeholder="+256 700000000"
          name="mobile"
          value={signupData.mobile}
          onChange={handleOnInputChange}
        />
        <LabelledInput
          label="Password"
          id="Password"
          type="password"
          placeholder="************"
          name="password"
          value={signupData.password}
          className="mb-2"
          onChange={handleOnInputChange}
        />
        <LabelledInput
          label="Confirm Password"
          id="C_password"
          placeholder="**********"
          name="confirmPassword"
          type="password"
          className="mb-2"
          onChange={handleOnInputChange}
          value={signupData.confirmPassword}
        />
        <div className="flex flex-col justify-center items-center mb-4">
          <Button onClick={handleSignin} className="w-[80%]">
            Signup
          </Button>
          <p>
            Already have an account?{" "}
            <Link
              className="hover:underline hover:text-blue-400"
              to="/auth/signin"
            >
              Signin
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
