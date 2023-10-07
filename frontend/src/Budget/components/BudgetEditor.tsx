import LabelledInput from "../../Components/LabelledInput";
import { Input } from "../../Components/ui/input";
import { Label } from "../../Components/ui/label";
import React from "react";
import { BudgetType } from "../dataTypesAndUtilities";

interface BudgetEditorProps {
  handleChange: (id: string, event: any) => void;
  newBudget: Partial<BudgetType>;
  id: string;
}

const BudgetEditor = ({ newBudget, handleChange, id }: BudgetEditorProps) => {
  
  
  return (
    <div className="p-2 grid">
      <div>
        <LabelledInput
          label="Budget Item*"
          id="budget"
          name="budget"
          required
          onChange={(e: any) => {
            handleChange(id, e);
          }}
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
            onChange={(e: any) => {
              handleChange(id, e);
            }}
            value={newBudget.amount}
          />
          <LabelledInput
            label="Payment date"
            id="dateOfPayment"
            name="dateOfPayment"
            type="date"
            placeholder="Please enter date this is supposed to be paid..."
            onChange={(e: any) => {
              handleChange(id, e);
            }}
            value={String(newBudget.dateOfPayment).split("T")[0]}
          />
          <LabelledInput
            label="Goal Id"
            id="goalId"
            name="goalId"
            placeholder="Please enter the monthly goal id this belongs to..."
            onChange={(e: any) => {
              handleChange(id, e);
            }}
            value={newBudget.goalId}
          />
          <div className="w-full mx-4 p-2">
            <select
              id="category"
              name="expenseCategory"
              value={newBudget.expenseCategory}
              onChange={(e: any) => {
                handleChange(id, e);
              }}
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
              onChange={(e: any) => {
                handleChange(id, e);
              }}
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
              onChange={(e: any) => {
                handleChange(id, e);
              }}
              checked={ (newBudget.paid !== 0)}
              type="checkbox"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetEditor;
