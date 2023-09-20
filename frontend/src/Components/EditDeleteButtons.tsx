import React from "react";
import { Edit, Trash2, MoreVertical } from "lucide-react";

const EditDeleteButtons = () => {
  return (
    <div className="flex ml-1">
      <div className="sm:hidden md:inline-block ml-2 xl:hidden">
        <MoreVertical />
      </div>
      <div className="m-0 p-0 hidden sm:flex md:hidden xl:flex">
        <div className="ml-4 mr-2 py-1">
          <Edit />
        </div>
        <div className="ml-2 mr-4 py-1">
          <Trash2 />
        </div>
      </div>
    </div>
  );
};

export default EditDeleteButtons;
