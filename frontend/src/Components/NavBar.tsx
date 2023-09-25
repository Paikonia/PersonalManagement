import React, { useState } from "react";
import { ChevronDownCircle, Menu,X } from "lucide-react";
import { useAuthContext } from "../Contexts/authContext";
import { useNavContext } from "../Contexts/sidebarContext";
import { Card } from "./ui/card";
const NavBar = () => {
  const { user } = useAuthContext();
  const {handleIsCollapsed, isCollapsed} = useNavContext()
  const m = user as unknown as any;
  const [dropDown, setDropDown] =useState(false)

  return (
    <div className="nav-bar-container">
      {isCollapsed ? (
        <Menu className="lg:hidden" onClick={handleIsCollapsed} />
      ) : (
        <X className="lg:hidden" onClick={handleIsCollapsed} />
      )}

      <div className="flex items-center">
        <p>{m.name}</p>
        <img
          className="w-12 h-12 mx-4 rounded-full"
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
          alt="simple"
        />
        <ChevronDownCircle onClick={() => {
          setDropDown(!dropDown)
        }} className="cursor-pointer" />

        {dropDown && <Card className="fixed p-4 top-16 right-4 w-64 h-48 border-2 shadow-lg">
         <h1 className="text-lg">Hello</h1>
        </Card>}
      </div>
    </div>
  );
};

export default NavBar;
