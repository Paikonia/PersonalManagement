import { Card } from "../Components/ui/card";
import LabelledInput from "../Components/LabelledInput";
import { Button } from "../Components/ui/button";
import { RegisterUser} from "../Contexts/authContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FetchError, baseUrl } from "../utils/fetch";

const Login = () => {
  const navigate = useNavigate()
  const [signupData, setSignupData] = useState<RegisterUser>({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    mobile: ""
  });

  const [, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FetchError | null>(null);
  const handleOnInputChange = (e: any) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignin =async () => {
      try {
        setError(null);
        setIsLoading(true);
        const response = await fetch(`${baseUrl}/auth/signup`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(signupData),
        });

        if (!response.ok) {
          if (response.status >= 400 && response.status < 500) {
            setError(await response.json());
          }
          setIsLoading(false);
          return;
        }

        const data = await response.json();

        setIsLoading(false);
        setError(null);
        if (data.session.requireConfirmation) {
          navigate("/auth/verify", {
            state: data.session,
          });
          return;
        }
      } catch (err) {
        console.error(err);
      }
    

  };
  return (
    <div className="w-full p-2 h-full flex bg-gray-100 justify-center items-center">
      <Card className="w-full lg:w-8/12 shadow-2xl">
        <img
          className="w-42 paikonia1h-36 mx-auto"
          src={require("../Resources/aikos-logo.png")}
          alt="Logo"
        />
        {error && <p className="text-red-400">{error.message}</p>}
        <div className="lg:grid lg:grid-cols-2">
          <LabelledInput
            label="First Name"
            id="FirstName"
            className="mb-2"
            placeholder="First Name....."
            name="firstName"
            value={signupData.firstName}
            onChange={handleOnInputChange}
          />
          <LabelledInput
            label="Last name"
            id="lastName"
            className="mb-2"
            placeholder="Last name....."
            name="lastName"
            value={signupData.lastName}
            onChange={handleOnInputChange}
          />
        </div>

        <LabelledInput
          label="Email"
          id="email"
          className="mb-2"
          placeholder="Email....."
          name="email"
          value={signupData.email}
          onChange={handleOnInputChange}
        />

        <div className="lg:grid lg:grid-cols-2">
          <LabelledInput
            label="Username"
            id="username"
            className="mb-2"
            placeholder="Username..."
            name="username"
            value={signupData.username}
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
        </div>
        <div className="lg:grid lg:grid-cols-2">
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
        </div>
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
