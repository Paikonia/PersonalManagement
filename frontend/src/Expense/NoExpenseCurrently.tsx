import { Link } from 'react-router-dom'

import Logo from "../Resources/aikos-logo.png";

const NoExpenseCurrently = () => {
  return (
    <div className="flex items-center justify-center p-2 flex-col">
      <div className="w-5/12 h-5/12">
        <img src={Logo} alt="Logo" />
      </div>

      <h1 className="text-4xl my-4">There are no Expense to display currently display</h1>
      <Link to={'compose'}>Add New Expense</Link>
    </div>
  );
};

export default NoExpenseCurrently;
