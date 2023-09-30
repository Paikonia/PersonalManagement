import { Card } from "../Components/ui/card";
import LabelledInput from "../Components/LabelledInput";
import { Button } from "../Components/ui/button";
import { useAuthContext } from "../Contexts/authContext";
import { Suspense, useState } from "react";
import {Link} from 'react-router-dom'
import { FetchError, baseUrl } from "../utils/fetch";
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const { setLogginResult  } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FetchError | null>(null);

  const signin = async (user: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${baseUrl}/auth/signin`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          user,
          password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.requireConfirmation) {
          navigate("/auth/verify", {
            state: data,
          });
          return;
        }
        setIsLoading(false);
        setLogginResult(data);
        navigate("/");
        localStorage.setItem("userData", JSON.stringify(data));
      } else {
        if (response.status >= 400 && response.status < 500) {
          const d = await response.json();
          console.log(d);
          setError(d);
          setIsLoading(false);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

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
    <Suspense>
      <div className="w-full h-[100vh] flex shadow-inner bg-gray-100 justify-center items-center">
        <Card className="w-8/12 shadow-2xl">
          <img
            className="w-72 h-64 mx-auto"
            src={require("../Resources/aikos-logo.png")}
            alt="Logo"
          />
          {error ? <p className="text-red-400 px-4">{error.message}</p> : <></>}
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
              Don't have an account?{" "}
              <Link
                className="hover:underline hover:text-blue-400"
                to="/auth/signup"
              >
                Signup
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </Suspense>
  );
};

export default Login;
