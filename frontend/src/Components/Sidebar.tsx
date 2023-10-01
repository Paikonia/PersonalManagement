import React from "react";
import {
  ListTodo,
  ListChecks,
  LayoutList,
  Receipt,
  Banknote,
  StickyNote,
  Home,
} from "lucide-react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useNavContext } from "../Contexts/sidebarContext";

const Sidebar = () => {
  const { isCollapsed } = useNavContext();
  const navigation = useNavigate();
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const link = event.currentTarget.getAttribute("href");
    navigation(link ?? "/");
  };

  return (
    <div
      className={`sidebar-container ${
        isCollapsed ? "hidden" : "side-bar-small-screen"
      }`}
    >
      <div className="border-t-2 pt-4 w-full border-t-teal">
        <ul className=" p-4 border-t-4 w-full">
          <li className="mb-4 text-lg hover:text-blue-400 px-1 flex justify-start align-center">
            <NavLink
              onClick={handleLinkClick}
              to="/"
              className={({ isActive }) =>
                `flex justify-center px-4 py-1 rounded-lg items-center ${
                  isActive ? "border-2 border-blue-400 text-blue-400" : ""
                }`
              }
            >
              <Home size={20} className="inline" />
              <span className="ml-2">Home</span>
            </NavLink>
          </li>
        </ul>
        <ul className=" p-4 border-t-4 w-full">
          <li className="mb-4 text-lg hover:text-blue-400 flex justify-start align-center">
            <NavLink
              onClick={handleLinkClick}
              to="/notes"
              className={({ isActive }) =>
                `flex justify-center px-4 py-1 rounded-lg items-center ${
                  isActive ? "border-2 border-blue-400 text-blue-400" : ""
                }`
              }
            >
              <StickyNote size={20} className="inline" />
              <span className="ml-2">Notes</span>
            </NavLink>
          </li>
          <li className="mb-4 text-lg hover:text-blue-400 flex justify-start align-center ">
            <NavLink
              onClick={handleLinkClick}
              to="/expense"
              className={({ isActive }) =>
                `flex justify-center px-4 py-1 rounded-lg items-center ${
                  isActive ? "border-2 border-blue-400 text-blue-400" : ""
                }`
              }
            >
              <Receipt />
              <span className=" ml-2">Expense</span>
            </NavLink>
          </li>
          <li className="mb-4 text-lg hover:text-blue-400 flex justify-start align-center ">
            <NavLink
              onClick={handleLinkClick}
              to="/budget"
              className={({ isActive }) =>
                `flex justify-center px-4 py-1 rounded-lg items-center ${
                  isActive ? "border-2 border-blue-400 text-blue-400" : ""
                }`
              }
            >
              <Banknote />
              <span className=" ml-2">Budget</span>
            </NavLink>
          </li>
        </ul>
        <ul className=" p-4 border-t-4 w-full">
          <li className="mb-4 text-lg hover:text-blue-400 flex justify-start align-center">
            <NavLink
              onClick={handleLinkClick}
              to="/tasks"
              className={({ isActive }) =>
                `flex justify-center px-4 py-1 rounded-lg items-center ${
                  isActive ? "border-2 border-blue-400 text-blue-400" : ""
                }`
              }
            >
              <ListChecks />
              <span className=" ml-2">Tasks</span>
            </NavLink>
          </li>
          <li className="mb-4 text-lg hover:text-blue-400 flex justify-start align-center ">
            <NavLink
              onClick={handleLinkClick}
              to="/wgoals"
              className={({ isActive }) =>
                `flex justify-center px-4 py-1 rounded-lg items-center ${
                  isActive ? "border-2 border-blue-400 text-blue-400" : ""
                }`
              }
            >
              <ListTodo />
              <span className=" ml-2">Weekly goals</span>
            </NavLink>
          </li>
          <li className="mb-4 text-lg hover:text-blue-400 flex justify-start align-center ">
            <NavLink
              onClick={handleLinkClick}
              to="/mgoals"
              className={({ isActive }) =>
                `flex justify-center px-4 py-1 rounded-lg items-center ${
                  isActive ? "border-2 border-blue-400 text-blue-400" : ""
                }`
              }
            >
              <LayoutList />
              <span className=" ml-2">Monthly Goal</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
