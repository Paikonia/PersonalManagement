import { useState } from "react";
import { ChevronDownCircle, LogOut, Menu,X } from "lucide-react";
import { useAuthContext } from "../Contexts/authContext";
import { useNavContext } from "../Contexts/sidebarContext";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
const NavBar = () => {
  const { user, signout } = useAuthContext();
  const {handleIsCollapsed, isCollapsed} = useNavContext()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const m = user as any;
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

        {dropDown && <Card className="fixed flex flex-col justify-end p-4 top-16 right-4 w-64 h-48 border-2 shadow-xl">
         <Button className="flex justify-between" onClick={signout}><LogOut /> Signout</Button>
        </Card>}
      </div>
    </div>
  );
};

export default NavBar;
