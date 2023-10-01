import { Button } from "../../Components/ui/button";
import LabelledInput from "../../Components/LabelledInput";
import React, { useState } from "react";
import useFetch from "../../utils/fetch";
import { Input } from "../../Components/ui/input";
import { Label } from "../../Components/ui/label";

interface NewBudgetCardProps {
  changeToDisplay: () => void;
}

const NewBudgetCard = ({ changeToDisplay }: NewBudgetCardProps) => {
  const [newBudget, setNewBudget] = useState({
    dateOfPayment: "",
    expenseCategory: "",
    budgetPrivacy: "private",
    goalId: "",
    budget: "",
    amount: 0,
    paid: false,
  });
  const fetch = useFetch();
  const onChangeHandler = (e: any) => {
    const { value, name } = e.target;

    setNewBudget((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitBudget = async () => {
    try {
      const data = await fetch("/budget", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify([newBudget]),
      });
      changeToDisplay();
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-2 grid">
      <div>
        <LabelledInput
          label="Budget Item*"
          id="budget"
          name="budget"
          required
          onChange={onChangeHandler}
          value={newBudget.budget}
          placeholder="Enter the budget item here..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <LabelledInput
            label="Budget Amount*"
            id="amount"
            required
            name="amount"
            placeholder="Amount in number"
            onChange={onChangeHandler}
            value={newBudget.amount}
          />
          <LabelledInput
            label="Payment date"
            id="dateOfPayment"
            name="dateOfPayment"
            type="date"
            placeholder="Please enter date this is supposed to be paid..."
            onChange={onChangeHandler}
            value={newBudget.dateOfPayment}
          />
          <LabelledInput
            label="Goal Id"
            id="goalId"
            name="goalId"
            placeholder="Please enter the monthly goal id this belongs to..."
            onChange={onChangeHandler}
            value={newBudget.goalId}
          />
          <div className="w-full mx-4 p-2">
            <select
              id="category"
              name="expenseCategory"
              value={newBudget.expenseCategory}
              onChange={onChangeHandler}
              className="py-4 px-4 w-full mr-2 rounded-lg"
            >
              <option value="">Select expense category</option>
              <option value="Food">Food</option>
              <option value="Clothing">Clothing</option>
              <option value="Family">Family</option>
              <option value="Academics">Academics</option>
              <option value="Living">Living</option>
              <option value="Travel">Travel</option>
            </select>
          </div>
          <div className="w-full mx-4 p-2">
            <select
              id="privacy"
              name="budgetPrivacy"
              value={newBudget.budgetPrivacy}
              onChange={onChangeHandler}
              className="py-4 w-full px-4 rounded-lg"
            >
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
          </div>
          <div className="mx-4 p-2 w-full">
            <Label className="block text-2xl" htmlFor="paid">
              Paid
            </Label>

            <Input
              name="paid"
              id="paid"
              className="mx-2 text-sm"
              onChange={(e) => {
                setNewBudget((prev) => ({
                  ...prev,
                  paid: e.target.checked,
                }));
              }}
              checked={newBudget.paid}
              type="checkbox"
            />
          </div>
        </div>
      </div>

      <Button onClick={submitBudget}>Submit Budget</Button>
    </div>
  );
};

export default NewBudgetCard;
