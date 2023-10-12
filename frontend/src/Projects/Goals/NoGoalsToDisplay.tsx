import { Button } from '../../Components/ui/button'
import React from 'react'

interface NoGoalsCurrentlyProps {
  changeToAdd: () => void;
}


const NoGoalsToDisplay = ({ changeToAdd }: NoGoalsCurrentlyProps) => {
  return (
    <div className="flex items-center justify-center p-2 flex-col">
      <div className="w-5/12 h-5/12">
        <img src={require("../../Resources/aikos-logo.png")} alt="Logo" />
      </div>

      <h1 className="text-4xl my-4">
        There are no Goals to display currently display
      </h1>
      <Button onClick={changeToAdd} className="my-5">
        Add New Goals
      </Button>
    </div>
  );
};

export default NoGoalsToDisplay