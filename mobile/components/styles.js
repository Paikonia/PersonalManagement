import styled from "styled-components";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Constants from "expo-constants";

const statusBarHeight = Constants.statusBarHeight;

export const colours = {
  primary: "#ffffff",
  secondary: "#feffee",
  tertiary: "#000000",
  darkLight: "#abb3aa",
  brand: "#9A784F",
  green: "#10b981",
  red: "#ef44444",
};

const { primary, secondary, tertiary, darkLight, brand, green, red } = colours;

export const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    padding: "25",
    paddingTop: "25",
    paddingTop: `${statusBarHeight + 10}`,
  },
});

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;

  background-color: ${primary};
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;
export const PageLogo = styled.Image`
  width: 250px;
  height: 250px;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;
`;
export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};
`;
export const StyledFormArea = styled.View`
  text-align: center;
  align-content: center;
  flex: 1;
  width: 90%;
`;
export const StyledInput = ({styles, children, ...props}) => (
  <TextInput
    style={{
      padding: 10,
      paddingLeft: 55,
      paddingRight: 55,
      fontSize: 16,
      borderRadius: 5,
      backgroundColor: `${secondary}`,
      marginVertical: 3,
      marginBottom: 10,
      color: `${tertiary}`,
      ...styles
    }}
    {...props}
  >{children}</TextInput>
);

export const StyledInputLabel = ({ text }) => {
  return (
    <Text style={{ color: `${tertiary}`, fontSize: 13, textAlign: "left" }}>
      {text}
    </Text>
  );
};

export const LeftIcon = ({ children }) => {
  return <View style={{ left: "15px", zIndex: 1 }}>{children}</View>;
};

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${brand};
  justify-content: start;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 16px;
`;
