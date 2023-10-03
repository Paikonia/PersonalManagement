import { Button } from "../../Components/ui/button";
import LabelledInput from "../../Components/LabelledInput";
import { useState, ChangeEvent } from "react";
import useFetch from "../../utils/fetch";

type NewProjectProps = {
  changeToDisplay: () => void;
};

const NewProject = ({ changeToDisplay }: NewProjectProps) => {
  const [] = useState({
    goal: "",
    urgency: "",
    importance: "",
    estimatedDuration: "",
    estimatePeriodPerDay: "",
    complete: false,
    goalCategory: "",
    privacy: "private",
    monthStart: "",
  });
  return (
    <div>
      <LabelledInput
        label="Project"
        name="goal"
        id="goal"
        placeholder="Enter project name..."
      />
      
    </div>
  );
};

export default NewProject;
