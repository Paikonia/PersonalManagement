import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";

const Signup = ({ navigation }) => {
  const [signupData, setSignupData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.textInputs}
          placeholder="Name"

          value={signupData.name}
          onChangeText={(text) =>
            setSignupData((prev) => ({
              ...prev,
              name: text,
            }))
          }
        />
        <TextInput
          style={styles.textInputs}
          placeholder="Username"
          value={signupData.username}
          onChangeText={(text) =>
            setSignupData((prev) => ({
              ...prev,
              username: text,
            }))
          }
        />
        <TextInput
          style={styles.textInputs}
          placeholder="Email"
          value={signupData.email}
          autoComplete='email'
          inputMode="email"
          onChangeText={(text) =>
            setSignupData((prev) => ({
              ...prev,
              email: text,
            }))
          }
        />
        <TextInput
          style={styles.textInputs}
          placeholder="Password"
          secureTextEntry
          value={signupData.password}
          onChangeText={(text) =>
            setSignupData((prev) => ({
              ...prev,
              password: text,
            }))
          }
        />
        <TextInput
          style={styles.textInputs}
          placeholder="Confirm Password"
          secureTextEntry
          value={signupData.confirmPassword}
          onChangeText={(text) =>
            setSignupData((prev) => ({
              ...prev,
              confirmPassword: text,
            }))
          }
        />
        <Button title="Signup" />
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
    borderRadius: 5,
  },
  wrapper: {
    width: "80%",
  },
});

export default Signup;
