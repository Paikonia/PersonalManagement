import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import Login from "./screens/Login";
import Constants from "expo-constants";

export default function App() {

  const [user, setUser] = useState()

  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#feffee",
    fontSize:24,
    padding: 8,
    paddingTop: Constants.statusBarHeight 
  },
  LoginInput: {
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    height: 40,
    marginBottom: 4,
    borderRadius: 10,
    padding: 4
  }, 
  text: {
    fontSize:24
  }
});
