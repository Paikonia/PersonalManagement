import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const BudgetComponent = ({budgetItem}) => {
  
  return (
    <View style={styles.container}>
      
      <Text>{budgetItem.budget}</Text>
      <Feather name="edit" size={24} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  budgetText: {
    fontSize: 20,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1
  }
})

export default BudgetComponent;
