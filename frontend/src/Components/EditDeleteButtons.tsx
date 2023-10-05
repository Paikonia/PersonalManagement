import React from "react";
import { Edit, Trash2, MoreVertical } from "lucide-react";

interface EditDeleteButtonsProps {
  deleteHandler: ()=> void;
  editHandler: ()=> void;
}

const EditDeleteButtons = ({deleteHandler, editHandler}:EditDeleteButtonsProps) => {
  return (
    <div className="flex ml-1">
      <div className="sm:hidden md:inline-block ml-2 xl:hidden">
        <MoreVertical />
      </div>
      <div className="m-0 p-0 hidden sm:flex md:hidden xl:flex">
        <div className="ml-4 mr-2 py-1">
          <Edit onClick={editHandler} />
        </div>
        <div className="ml-2 mr-4 py-1">
          <Trash2 onClick={deleteHandler} />
        </div>
      </div>
    </div>
  );
};

export default EditDeleteButtons;
