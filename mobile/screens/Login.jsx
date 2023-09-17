import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useAuthContext } from "../contexts/authContext";

const Login = ({navigation}) => {
  const [loginData, setLoginData] = useState({
    user: "",
    password: "",
  });
  const handleChange = (e) => {
    const {name, value} = e.target
    setLoginData({
      ...loginData, [name]: value
    })
  };
  const { signin } = useAuthContext();
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          onChangeText={(e) => {
            setLoginData((prev) => ({
              ...prev,
              user: e,
            }));
          }}
          value={loginData.user}
          style={styles.textInputs}
          placeholder="Email or username...."
        />
        <TextInput
          value={loginData.password}
          secureTextEntry
          onChangeText={(text) => {
            setLoginData((prev) => ({ ...prev, password: text }));
          }}
          style={styles.textInputs}
          placeholder="Password..."
        />
        <Button
          onPress={() => {
            signin(loginData.user, loginData.password);
          }}
          title="Login"
          accessibilityLabel="Login"
        />
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    width: "100%",
  },
  textInputs: {
    borderWidth: 2,
    borderColor: "#bbb",
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 20,
    marginBottom: 8,
    color: "black",
    borderRadius: 5
  },
  wrapper: {
    width: "80%",
  },
});

export default Login;
