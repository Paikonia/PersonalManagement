import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import WelcomeScreen from "../screens/WelcomeScreen";
import Budget from "../screens/Budget";
import Expenses from "../screens/Expenses";
import Notes from "../screens/Notes";
import Tasks from "../screens/Tasks";
const Stack = createBottomTabNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={WelcomeScreen}
        options={{
          tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />,
        }}
      />
      <Stack.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="tasks" size={24} color="black" />
          ),
        }}
      />
      <Stack.Screen
        name="Budget"
        component={Budget}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="tasks" size={24} color="black" />
          ),
        }}
      />
      <Stack.Screen
        name="Expenses"
        component={Expenses}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="table" size={24} color="black" />
          ),
        }}
      />
      <Stack.Screen
        name="Notes"
        component={Notes}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="sticky-note" size={24} color="black" />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
