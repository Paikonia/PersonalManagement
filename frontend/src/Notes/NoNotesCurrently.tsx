import React from 'react'
import { Button } from "../Components/ui/button";

interface NoNotesCurrentlyProps {
  changeToAdd: () => void;
}

const NoNotesCurrently = ({changeToAdd}: NoNotesCurrentlyProps) => {
  return (
    <div className="flex items-center justify-center p-2 flex-col">
      <div className="w-5/12 h-5/12">
        <img src={require("../Resources/aikos-logo.png")} alt="Logo" />
      </div>

      <h1 className="text-4xl my-4">There are no Notes to display currently display</h1>
      <Button onClick={changeToAdd} className="my-5">Add New Note</Button>
    </div>
  
  );
}

export default NoNotesCurrently