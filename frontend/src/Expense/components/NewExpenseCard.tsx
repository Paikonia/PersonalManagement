import { Button } from "../../Components/ui/button";
import LabelledInput from "../../Components/LabelledInput";
import React, { useState } from "react";
import useFetch from "../../utils/fetch";

interface NewExpenseCardProps {
  changeToDisplay: () => void;
}

const NewExpenseCard = ({ changeToDisplay }: NewExpenseCardProps) => {
  const [newExpense, setNewExpense] = useState({
    budgetId: "",
    item: "",
    amount: "",
    paymentMethod: "Cash",
    expenseCategory: "",
    expensePrivacy: "private",
  });
  const fetch = useFetch()
  const onChangeHandler = (e: any) => {
    const { value, name } = e.target;

    setNewExpense((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitExpense = async() => {
    try {
      const response = await fetch("/expense", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify([newExpense]),
      });
      console.log(response);
      changeToDisplay();
    } catch (error) {
      console.error(error)
    }
    
  };

  return (
    <div className="p-2 flex justify-center flex-col w-full">
      <LabelledInput
        label="Expense Item*"
        placeholder="Item purchased..."
        name="item"
        id="item"
        className="w-full"
        onChange={onChangeHandler}
        value={newExpense.item}
      />

      <div className="grid grid-cols-2">
        <LabelledInput
          label="Amount*"
          placeholder="Amount spent..."
          name="amount"
          id="amount"
          className="w-full"
          onChange={onChangeHandler}
          value={newExpense.amount}
        />
        <LabelledInput
          label="Budget ID"
          placeholder="The budget this expense belongs to"
          name="budgetId"
          id="budgetId"
          className="w-full"
          onChange={onChangeHandler}
          value={newExpense.budgetId}
        />
      </div>

      <div className="grid grid-cols-3 py-3 m-4">
        <select
          id="category"
          name="expenseCategory"
          value={newExpense.expenseCategory}
          onChange={onChangeHandler}
          className="py-4 px-4 mr-2 rounded-lg"
        >
          <option value="">Select expense category</option>
          <option value="Food">Food</option>
          <option value="Clothing">Clothing</option>
          <option value="Family">Family</option>
          <option value="Academics">Academics</option>
          <option value="Living">Living</option>
          <option value="Travel">Travel</option>
        </select>
        <select
          id="method"
          name="paymentMethod"
          value={newExpense.paymentMethod}
          onChange={onChangeHandler}
          className="py-4 px-4 mr-2 rounded-lg"
        >
          <option value="Credit">Credit</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
        </select>
        <select
          id="privacy"
          name="expensePrivacy"
          value={newExpense.expensePrivacy}
          onChange={onChangeHandler}
          className="py-4 px-4 rounded-lg"
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
      </div>

      <Button onClick={submitExpense}>Submit Expense</Button>
    </div>
  );
};

export default NewExpenseCard;
