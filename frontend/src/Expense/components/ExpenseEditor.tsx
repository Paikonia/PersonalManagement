import React from 'react'
import LabelledInput from '../../Components/LabelledInput';


interface ExpenseEditorProps {
    onChangeHandler: (expenseId: string, e:any)=> void
    editedExpense: ExpenseType
    expenseId: string
}


const ExpenseEditor = ({expenseId ,onChangeHandler, editedExpense}:ExpenseEditorProps) => {
  return (
    <div className="p-2 flex justify-center flex-col w-full">
      <LabelledInput
        label="Expense Item*"
        placeholder="Item purchased..."
        name="item"
        id="item"
        className="w-full"
        onChange={(e:any)=> onChangeHandler(expenseId, e)}
        value={editedExpense.item}
      />

      <div className="grid grid-cols-1 md:grid-cols-2">
        <LabelledInput
          label="Amount*"
          placeholder="Amount spent..."
          name="amount"
          id="amount"
          className="w-full"
          onChange={(e:any)=> onChangeHandler(expenseId, e)}
          value={editedExpense.amount}
        />
        <LabelledInput
          label="Budget ID"
          placeholder="The budget this expense belongs to"
          name="budgetId"
          id="budgetId"
          className="w-full"
          onChange={(e:any)=> onChangeHandler(expenseId, e)}
          value={editedExpense.budgetId || ''}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <select
          id="category"
          name="expenseCategory"
          value={editedExpense.expenseCategory}
          onChange={(e:any)=> onChangeHandler(expenseId, e)}
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
          value={editedExpense.paymentMethod}
          onChange={(e:any)=> onChangeHandler(expenseId, e)}
          className="py-4 px-4 mr-2 rounded-lg"
        >
          <option value="Credit">Credit</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
        </select>
        <select
          id="privacy"
          name="expensePrivacy"
          value={editedExpense.expensePrivacy}
          onChange={(e:any)=> onChangeHandler(expenseId, e)}
          className="py-4 px-4 rounded-lg"
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
      </div>

    </div>
  );
}

export default ExpenseEditor