import { Button } from "../../Components/ui/button";
import LabelledInput from "../../Components/LabelledInput";
import { ChangeEvent, useEffect, useState } from "react";
import useFetch from "../../utils/fetch";
import { useSearchParams } from "react-router-dom";

const ComposeExpense = () => {
  const [newExpense, setNewExpense] = useState<ExpenseType>({
    budgetId: "",
    item: "",
    amount: 0,
    paymentMethod: "Cash",
    expenseCategory: "Living",
    expensePrivacy: "private",
    expenseDate: Date.now().toString(),
    creator: '',
    expenseId: ''
  });
  const [loadingExpense, setLoadingExpense] = useState<boolean>(false)
  const [searchParams] = useSearchParams()
  const id = searchParams.get("eId")
  const fetch = useFetch();
  
  useEffect(()=> {
    const caller = async () => {
      if(id) {
        setLoadingExpense(true)
        try{
          const data = (await fetch('/expense/'+id)) as ExpenseType
          setNewExpense(data)
        }catch(e){
          console.error(e)
        }finally {
          setLoadingExpense(false)
        }
      }
    }
    caller()
  }, [])
  
  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { value, name } = e.target;

    setNewExpense((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitExpense = async () => {
    try {
      await fetch("/expense", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify([newExpense]),
      });
    } catch (error) {
      console.error(error);
    }
  };

  if(loadingExpense) {
    return <h1>The expense is loading for editing</h1>
  }

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

      <div className="grid grid-cols-1 md:grid-cols-2">
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
          value={newExpense.budgetId || ''}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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

export default ComposeExpense;
