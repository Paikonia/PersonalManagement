import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import LabelledInput from "../Components/LabelledInput";
import { Button } from "../Components/ui/button";
import { useAuthContext } from "../Contexts/authContext";
import { Card } from "../Components/ui/card";
const Verify = () => {
  const { state } = useLocation();
  const [code, setCode] = useState("");
  const session = state.requireConfirmation.session;
  const { verifyEmail } = useAuthContext();
  const verifyHandler = () => {
    verifyEmail(session, code);
  };

  return (
    <div className="w-full h-full flex p-2 justify-center items-center">
      <Card className="w-full p-4 lg:w-8/12 shadow-2xl">
        <img
          className="w-64 h-48 mx-auto"
          src={require("../Resources/aikos-logo.png")}
          alt="Logo"
        />
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
