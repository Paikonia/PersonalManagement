import React from "react";
import { Pencil, ListTodo, ListChecks, LayoutList, Receipt, Banknote } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigation = useNavigate();
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const link = event.currentTarget.getAttribute("href");
    navigation(link ?? "/");
  };

  return (
    <div className="bg-gray-100 shadow-black transition-all duration-500 shadow-lg h-full fixed  left-0 top-0 bottom-0 text-black w-48">
      <div className="border-t-2 pt-4 border-t-teal">
        <ul className=" p-4 border-t-4 w-full">
          <li className="mb-4 text-lg hover:text-blue-400 flex justify-start align-center">
            <Link
              onClick={handleLinkClick}
              to="/notes"
              className="flex justify-center items-center"
            >
              <Pencil size={20} className="inline" />
              <span className="ml-2">Notes</span>
            </Link>
          </li>
          <li className="mb-4 text-lg hover:text-blue-400 flex justify-start align-center ">
            <Link
              onClick={handleLinkClick}
              to="/expense"
              className="flex justify-center items-center"
            >
              <Receipt />
              <span className=" ml-2">Expense</span>
            </Link>
          </li>
          <li className="mb-4 text-lg hover:text-blue-400 flex justify-start align-center ">
            <Link
              onClick={handleLinkClick}
              to="/budget"
              className="flex justify-center items-center"
            >
              <Banknote />
              <span className=" ml-2">Budget</span>
            </Link>
          </li>
        </ul>
        <ul className=" p-4 border-t-4 w-full">
          <li className="mb-4 text-lg hover:text-blue-400 flex justify-start align-center">
            <Link
              onClick={handleLinkClick}
              to="/tasks"
              className="flex justify-center items-center"
            >
              <ListChecks />
              <span className=" ml-2">Tasks</span>
            </Link>
          </li>
          <li className="mb-4 text-lg hover:text-blue-400 flex justify-start align-center ">
            <Link
              onClick={handleLinkClick}
              to="/wgoals"
              className="flex justify-center items-center"
            >
              <ListTodo />
              <span className=" ml-2">Weekly goals</span>
            </Link>
          </li>
          <li className="mb-4 text-lg hover:text-blue-400 flex justify-start align-center ">
            <Link
              onClick={handleLinkClick}
              to="/mgoals"
              className="flex justify-center items-center"
            >
              <LayoutList />
              <span className=" ml-2">Monthly Goal</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
