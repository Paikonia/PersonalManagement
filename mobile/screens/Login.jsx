import React from "react";
import { styles } from "../components/styles";
import IconedInput from "../components/IconInput";
import { StyleSheet, View, Text } from "react-native";

const Login = () => {
  return (
    <View style={styles.outerContainer}>
      <Text>Hello</Text>
      <IconedInput icon={'mail'}  placeholder='enter email or username....' label={'Hello 2'}/>
    </View>
  );
};

// const styles = StyleSheet.create({
//     container: {

//     }
// })

export default Login;
