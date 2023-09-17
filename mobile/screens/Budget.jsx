import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useAuthContext } from "../contexts/authContext";
import axios from "axios";
import BudgetComponent from "../components/pages/Budget";

const budgetItem = {
  budget: "Budget 1",
  amount: 200,
  date: "Thursday",
  goalId: "",
  expenseCategory: "Living",
  budgetPrivacy: "Private",
};

const Budget = () => {
  const [budgetItems, setBudgetItems] = useState([]);
  const { userToken, refreshToken } = useAuthContext();
  useEffect(() => {
    axios
      .get(
        "https://pm.aikosnotes.info/api/budget",
        { headers: { Authorization: `Bearer ${userToken}` } }
      )
      .then((res) => {
        setBudgetItems(res.data)
      })
      .catch((err) => {
        console.error(err);
      });
  });
  return (
    <View>
      <BudgetComponent budgetItem={budgetItem} />
    </View>
  );
};

export default Budget;
