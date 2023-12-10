import EditDeleteButtons from "../../Components/EditDeleteButtons";
import { Card } from "../../Components/ui/card";
import useFetch from "../../utils/fetch";
import { useNavigate } from "react-router-dom";



const BudgetDisplayCard = ({
  budget,
  handleClick,
  currentBudget,
}: {
  budget: PartialBudgetType;
  handleClick: (id: string) => void;
  currentBudget: BudgetType | null | undefined;
}) => {
  const fetch = useFetch();

  const deleteHanler = async () => {
    const body = JSON.stringify({budgetIds:[budget.budgetId]})
    await fetch('/budget', {
      method: 'DELETE',
      headers: {'content-type': 'application/json'},
      body: body
    })
  };
  const navigate = useNavigate()
  const handleEdit = () => {
    navigate("compose?bId=" + budget.budgetId)
  };

  return (
    <Card
      onClick={() => {
        handleClick(budget.budgetId);
      }}
      className="border-2 bg-gray-200 hover:bg-gray-300 overflow-hidden w-full rounded-xl p-2 mb-4"
    >
      <div className="flex justify-between">
        <div className="flex w-full px-1 py-0 left-0 justify-start items-center">
          <input type="checkbox" className="w-4" />
          <div className=" px-2 flex justify-between w-full">
            <p>{budget.budget}</p>
            <p>Amount: {budget.amount}</p>
          </div>
        </div>
        <EditDeleteButtons
          deleteHandler={deleteHanler}
          editHandler={handleEdit}
        />
      </div>
      {currentBudget && currentBudget.budgetId === budget.budgetId && (
        <Card className="p-2 my-2">
          <div className="flex mb-2 justify-between">
            <p>Category: {currentBudget.expenseCategory}</p>
            <p>
              Date:{" "}
              {
                new Date(currentBudget?.dateOfPayment || Date.now())
                  .toISOString()
                  .split("T")[0]
              }
            </p>
          </div>
          <div className="flex justify-between">
            <p>Paid: {(budget.paid )? "Pending" : "Paid"}</p>
            <p>Privacy: {currentBudget.budgetPrivacy}</p>
          </div>
        </Card>
      )}
    </Card>
  );
};

export default BudgetDisplayCard;
