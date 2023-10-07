import EditDeleteButtons from "../../Components/EditDeleteButtons";
import { ExpenseType, PartialExpenseType } from "../dataTypesAndUtilities";
import { Card } from "../../Components/ui/card";
import useFetch from "../../utils/fetch";
import { useNavigate } from "react-router-dom";

const ExpenseDisplayCard = ({
  expense,
  handleClick,
  currentExpense,
}: {
  expense: PartialExpenseType;
  handleClick: (id: string) => void;
  currentExpense: ExpenseType | null | undefined;
}) => {
  const fetch = useFetch();
  const handleDelete = async() => {
    const body = JSON.stringify({expenseIds: [expense.expenseId]})
    const result = await fetch('/expense', {
      method: 'DELETE',
      headers: {'content-type':'application/json'},
      body: body
    })
    console.log(result)
    window.location.reload()
  };

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/expense/edit', {state: [expense.expenseId]})
  };


  return (
    <Card
      onClick={() => {
        handleClick(expense.expenseId);
      }}
      className="border-2 bg-gray-200 hover:bg-gray-300 overflow-hidden w-full rounded-xl p-2 mb-4"
    >
      <div className="flex justify-between">
        <div className="flex w-full px-1 py-0 left-0 justify-start items-center">
          <input
            type="checkbox"
            className="mx-1 w-4"
            name={expense.expenseId}
            id={expense.expenseId}
          />
          <div className="flex justify-between w-full">
            <p className="ml-2 w-30  sm:w-42 max-w-xs mr-2 truncate">
              {expense.item}
            </p>
            <h3 className="mr-2">Amount: {expense.amount}</h3>
          </div>
        </div>
        <EditDeleteButtons
          deleteHandler={handleDelete}
          editHandler={handleEdit}
        />
      </div>
      {currentExpense && currentExpense?.expenseId === expense.expenseId && (
        <Card className="p-2 bg-gray-100">
          <div className="flex justify-between mb-2">
            <p>Category: {currentExpense.expenseCategory}</p>
            <p>Privacy: {currentExpense.expensePrivacy}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Payment Method: {currentExpense.paymentMethod}</p>
            <p>
              Date:{" "}
              {
                new Date(currentExpense?.expenseDate || Date.now())
                  .toISOString()
                  .split("T")[0]
              }
            </p>
          </div>
        </Card>
      )}
    </Card>
  );
};

export default ExpenseDisplayCard;
