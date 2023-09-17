import { Card } from "../Components/ui/card";
import LabelledInput from "../Components/LabelledInput";
import { Button } from "../Components/ui/button";
import { useAuthContext } from "../Contexts/authContext";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const { signin } = useAuthContext();
  const [signinData, setSigninData] = useState({
    user: "",
    password: "",
  });
  const handleOnInputChange = (e: any) => {
    const { name, value } = e.target;
    setSigninData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignin = () => {
    signin(signinData.user, signinData.password);
  };
  return (
    <div className="w-full h-[100vh] flex bg-gray-100 justify-center items-center">
      <Card className="w-8/12 shadow-2xl">
        <p>Signup page.</p>
        <LabelledInput
          label="Name"
          id="name"
          placeholder="Name....."
          name="name"
          value={signinData.user}
          onChange={handleOnInputChange}
        />
        <LabelledInput
          label="Username or email"
          id="username"
          placeholder="Username"
          name="username"
          value={signinData.user}
          onChange={handleOnInputChange}
        />
        <LabelledInput
          label="Email"
          id="email"
          placeholder="Email....."
          name="email"
          value={signinData.user}
          onChange={handleOnInputChange}
        />
        <LabelledInput
          label="Password"
          id="Password"
          type="password"
          placeholder="************"
          name="password"
          value={signinData.user}
          onChange={handleOnInputChange}
        />
        <LabelledInput
          label="Confirm Password"
          id="C_password"
          placeholder="**********"
          name="confirmPassword"
          type="password"
          onChange={handleOnInputChange}
          value={signinData.password}
        />
        <div className="flex flex-col justify-center items-center mb-4">
          <Button onClick={handleSignin} className="w-[80%]">
            Login
          </Button>
          <p>
            Already have an account? <Link to="/auth/signin">Signin</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
