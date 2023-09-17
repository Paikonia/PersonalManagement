
import {
  StyleSheet,
} from "react-native";

import Constants from "expo-constants";
import { AuthContextProvider, useAuthContext } from "./contexts/authContext";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#feffee",
    fontSize: 24,
    padding: 8,
    paddingTop: Constants.statusBarHeight,
  },
  LoginInput: {
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    height: 40,
    marginBottom: 4,
    borderRadius: 10,
    padding: 4,
  },
  text: {
    fontSize: 24,
  },
});
