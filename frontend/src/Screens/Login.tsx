import { Card } from "../Components/ui/card";
import LabelledInput from "../Components/LabelledInput";
import { Button } from "../Components/ui/button";
import { useAuthContext } from "../Contexts/authContext";
import { useState } from "react";
import {Link} from 'react-router-dom'

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
    <div className="w-full h-[100vh] flex shadow-inner bg-gray-100 justify-center items-center">
      <Card className="w-8/12 shadow-2xl">

        <img className="w-72 h-64 mx-auto" src={require("../Resources/aikos-logo.png")} alt="Logo" />
        <LabelledInput
          label="Username or email"
          id="user"
          placeholder="Username or email....."
          name="user"
          value={signinData.user}
          onChange={handleOnInputChange}
        />
        <LabelledInput
          label="Password"
          id="password"
          placeholder="**********"
          name="password"
          type="password"
          onChange={handleOnInputChange}
          value={signinData.password}
        />
        <div className="flex flex-col justify-center items-center mb-4">
          <Button onClick={handleSignin} className="w-[80%]">
            Login
          </Button>
          <p>
            Don't have an account? <Link className="hover:underline hover:text-blue-400" to="/auth/signup">Signup</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
