import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LabelledInput from "../Components/LabelledInput";
import { Button } from "../Components/ui/button";
import { useAuthContext } from "../Contexts/authContext";
import { Card } from "../Components/ui/card";
import { FetchError, baseUrl } from "../utils/fetch";
const Verify = () => {
  const navigate = useNavigate()
  const [, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FetchError | null>(null);

  const { state } = useLocation();
  const [code, setCode] = useState("");
  const session = state.requireConfirmation.session;
  const { setLogginResult } = useAuthContext();
  const verifyHandler = () => {
    verifyEmail(session, code);
  };

  const verifyEmail = async (session: string, code: string) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(`${baseUrl}/auth/verify/email`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ session, code }),
    });
    if (!response.ok) {
      if (response.status >= 400 && response.status < 500) {
        setError(await response.json());
      }
      setIsLoading(false);
      return;
    }
    const res = await response.json();
    setLogginResult(res);
    navigate("/");
    setIsLoading(false);
    setError(null);
  };

  return (
    <div className="w-full h-full flex p-2 justify-center items-center">
      <Card className="w-full p-4 lg:w-8/12 shadow-2xl">
        <img
          className="w-64 h-48 mx-auto"
          src={require("../Resources/aikos-logo.png")}
          alt="Logo"
        />
        {error && <p className="px-4 text-red-500">{error.message}</p>}
        <LabelledInput
          label="Code"
          id="sessionCode"
          name="code"
          placeholder="Enter new code..."
          onChange={(e) => {
            setCode(e.target.value);
          }}
        />
        <Button className="w-full" onClick={verifyHandler}>
          Verify
        </Button>
      </Card>
    </div>
  );
};

export default Verify;
