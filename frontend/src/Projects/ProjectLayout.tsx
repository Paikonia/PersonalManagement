import { Outlet, NavLink } from 'react-router-dom'


const ProjectLayout = () => {
  return (
    <div>
      <section className="flex w-full mb-4 justify-between">
        <NavLink
          className={({ isActive }) => {
            return `btn ${isActive ? "border-2" : ""}`;
          }}
          to={"."}
        >
          Projects
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return `btn ${isActive ? "border-2" : ""}`;
          }}
          to="goals"
        >
          Goals
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return `btn ${isActive ? "border-2" : ""}`;
          }}
          to="tasks"
        >
          Tasks
        </NavLink>
      </section>
      <Outlet />
    </div>
  );
}

export default ProjectLayout