import { Button } from "../../../Components/ui/button";
import LabelledInput from "../../../Components/LabelledInput";
import { useState } from "react";
import useFetch from "../../../utils/fetch";
import { Card } from "../../../Components/ui/card";
import { Input } from "../../../Components/ui/input";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../../../Contexts/useProjects";

// type NewProjectProps = {};

const NewProject = () => {
  const [newProject, setNewProject] = useState({
    goal: "",
    urgency: 1,
    importance: 1,
    estimatedDuration: "",
    estimatePeriodPerDay: 0,
    complete: false,
    goalCategory: "",
    privacy: "private",
    monthStart: "",
  });

  const checkValue = (e: any) => {
    const { name, checked } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const onChangeValue = (e: any) => {
    const { name, value } = e.target;

    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const limitedChange = (e: any) => {
    const { name, value } = e.target;
    try {
      let g: number;
      if (!isNaN(value)) {
        if (Number(value) < 0 || Number(value) > 10) {
          if (Number(value) <= 0) g = 1;
          if (Number(value) > 10) g = 10;
        } else g = Number(value);
        setNewProject((pv) => {
          return { ...pv, [name]: g };
        });
      }
    } catch (error) {}
  };
  const fetch = useFetch();
  const navigate = useNavigate();
  const {refreshProjects} = useProjects()
  const handleSubmit = async () => {
    await fetch("/goal/month", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify([newProject]),
    });
    refreshProjects()
    navigate("/projects/projects");
    
  };

  return (
    <Card className="p-4">
      <LabelledInput
        label="Project"
        name="goal"
        id="goal"
        placeholder="Enter project name..."
        onChange={onChangeValue}
        value={newProject.goal}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
        <LabelledInput
          label="Urgency"
          name="urgency"
          id="urgency"
          type="number"
          placeholder="Project Urgency 1-10..."
          onChange={limitedChange}
          value={newProject.urgency}
          max={10}
          min={1}
        />
        <LabelledInput
          label="Importance"
          name="importance"
          id="importance"
          type="number"
          placeholder="Enter project importance 1-10..."
          onChange={limitedChange}
          value={newProject.importance}
          max={10}
          min={1}
        />
        <LabelledInput
          label="Estimate project Duration"
          name="estimatedDuration"
          id="estimatedDuration"
          placeholder="Enter project duration..."
          value={newProject.estimatedDuration}
          onChange={onChangeValue}
        />
        <LabelledInput
          label="Minutes per day"
          name="estimatePeriodPerDay"
          id="estimatePeriodPerDay"
          placeholder="Enter project estimated duration per day..."
          value={newProject.estimatePeriodPerDay}
          onChange={onChangeValue}
        />

        <LabelledInput
          label="Month start"
          name="monthStart"
          id="monthStart"
          placeholder="Enter project estimated duration per day..."
          value={newProject.monthStart}
          type="date"
          onChange={onChangeValue}
        />

        <div className="w-full mx-4 p-2">
          <label htmlFor="goalCategory">Goal Category</label>
          <select
            id="goalCategory"
            name="goalCategory"
            value={newProject.goalCategory}
            onChange={onChangeValue}
            className="py-4 px-4 w-full mr-2 rounded-lg"
          >
            <option value="">Select Project Category</option>
            <option value="personal">Personal</option>
            <option value="fitness">Fitness</option>
            <option value="family">Family</option>
            <option value="job">Job</option>
            <option value="project">Project</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="w-full mx-4 p-2">
          <label htmlFor="goalCategory">Goal Category</label>
          <select
            id="privacy"
            name="privacy"
            value={newProject.privacy}
            onChange={onChangeValue}
            className="py-4 px-4 w-full mr-2 rounded-lg"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="w-full flex flex-col mx-4 p-2">
          <label htmlFor="goalCategory">Goal Category</label>
          <Input
            onClick={checkValue}
            name="complete"
            checked={newProject.complete}
            className="inline"
            type="checkbox"
          />
        </div>
      </div>

      <Button onClick={handleSubmit} className="w-full">
        Submit Project
      </Button>
    </Card>
  );
};

export default NewProject;
