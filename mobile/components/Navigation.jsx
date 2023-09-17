import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuthContext } from "../contexts/authContext";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

const Navigation = () => {
  const { refreshToken,  } = useAuthContext();
  return (
    <NavigationContainer>
      {refreshToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
