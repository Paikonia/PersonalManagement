import React from "react";
import { LeftIcon, StyledInput, StyledInputLabel } from "./styles";
import { View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { colours } from "./styles";

const IconedInput = ({ label, icon, ...props }) => {
  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <StyledInputLabel>{label}</StyledInputLabel>
      <View >
        <LeftIcon>
          <Octicons color={colours.brand} name={icon} size={20} />
        </LeftIcon>
        <StyledInput {...props} />
      </View>
    </View>
  );
};

export default IconedInput;
