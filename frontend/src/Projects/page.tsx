import { NavLink, Outlet } from "react-router-dom";
import { Card } from "../Components/ui/card";

const Projects = () => {
  
  return (
    <div>
      <Card className="w-full p-2 fixed shadow-sm rounded-none flex flex-row-reverse bottom-0 left-0 right-0 border-t-2 h-12">
        <NavLink
          className={({ isActive }) =>
            `mx-4 items-center justify-center flex px-2 border-2 hover:to-blue-300 ${
              isActive
                ? "border-2 rounded-lg  border-blue-400 text-blue-400"
                : ""
            }`
          }
          to={"/projects/projects"}
        >
          Projects
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `mx-4 items-center justify-center flex px-2 border-2 hover:to-blue-300 ${
              isActive
                ? "border-2 rounded-lg  border-blue-400 text-blue-400"
                : ""
            }`
          }
          to={"/projects/goals"}
        >
          Goals
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `mx-4 items-center justify-center flex px-2 border-2 hover:to-blue-300 ${
              isActive
                ? "border-2 rounded-lg  border-blue-400 text-blue-400"
                : ""
            }`
          }
          to={"/projects/tasks"}
        >
          Tasks
        </NavLink>
      </Card>
      {<Outlet />}
    </div>
  );
};

export default Projects;
