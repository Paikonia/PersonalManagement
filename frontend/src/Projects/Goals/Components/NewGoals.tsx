import LabelledInput from "../../../Components/LabelledInput";
import { Button } from "../../../Components/ui/button";
import { Card } from "../../../Components/ui/card";
import React, { useEffect, useState } from "react";
import { useProjects } from "../../../Contexts/useProjects";
import Select from 'react-select'
import { useNavigate } from "react-router-dom";
import useFetch from "../../../utils/fetch";
import { useGoals } from "../../../Contexts/useGoals";
const NewGoals = () => {
  const [newGoal, setNewGoal] = useState<Partial<GoalsTypes>>({
    urgency: 0,
    importance: 0,
    weekStart: "",
    weekEnd: "",
    monthlyGoalId: "",
    privacy: "private",
    goal: "",
    completed: false
  });

  const {projects} = useProjects()
  const {refreshGoals} =useGoals()
  
  const [options, setOptions] = useState<{value: string, label: string}[]>()

  useEffect(()=> {
    if(projects) setOptions(projects.map(proj=> ({value: proj.mGoalId, label: proj.goal})))
  }, [projects])


  const onChangeHandler = (e:any)=> {
    const {value, name} = e.target;
    setNewGoal(prev=> ({...prev, [name]: value}))
  }

  console.log(newGoal)

  const limitedChange = (e: any) => {
    const { name, value } = e.target;
    try {
      let g: number;
      if (!isNaN(value)) {
        if (Number(value) < 0 || Number(value) > 10) {
          if (Number(value) <= 0) g = 1;
          if (Number(value) > 10) g = 10;
        } else g = Number(value);
        setNewGoal((pv) => {
          return { ...pv, [name]: g };
        });
      }
    } catch (error) {}
  };

  const fetch = useFetch()
  const navigate = useNavigate()
  const handleSubmit = async() => {
    const data = await fetch("/goal/week", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify([newGoal]),
    });
    console.log(data)
    
    refreshGoals();
    navigate("/projects/goals");
  }

  return (
    <Card className="p-4">
      <LabelledInput
        label="Goal"
        name="goal"
        id="goal"
        placeholder="Enter project name..."
        onChange={onChangeHandler}
        value={newGoal.goal}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
        <LabelledInput
          label="Urgency"
          name="urgency"
          id="urgency"
          type="number"
          placeholder="Project Urgency 1-10..."
          onChange={limitedChange}
          value={newGoal.urgency}
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
          value={newGoal.importance}
          max={10}
          min={1}
        />

        {/* <LabelledInput
          label="Project"
          name="monthlyGoalId"
          id="monthlyGoalId"
          placeholder="Project..."
          value={newGoal.monthlyGoalId}
          onChange={onChangeHandler}
        />
        <datalist id="monthlyGoalId"> 
        {
          projects && projects.map((project) => {return <option key={project.mGoalId} value={project.mGoalId}>{project.goal}</option>})
        }
        </datalist> */}

        <Select
          options={options}
          isSearchable
          placeholder="Project"
          name="monthlyGoalId"
          onChange={(e)=> {
            if(e)
            setNewGoal((prev) => ({ ...prev, monthlyGoalId: e.value}));
          }}
        />

        <LabelledInput
          label="Week start"
          name="weekStart"
          id="weekStart"
          placeholder="Enter project estimated duration per day..."
          value={newGoal.weekStart}
          type="date"
          onChange={onChangeHandler}
        />
        <LabelledInput
          label="Week end"
          name="weekEnd"
          id="weekEnd"
          placeholder="Enter project estimated duration per day..."
          value={newGoal.weekEnd}
          type="date"
          onChange={onChangeHandler}
        />

        <div className="w-full mx-4 p-2">
          <label htmlFor="goalCategory">Goal Category</label>
          <select
            id="privacy"
            name="privacy"
            value={newGoal.privacy}
            onChange={onChangeHandler}
            className="py-4 px-4 w-full mr-2 rounded-lg"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        {/* <div className="w-full flex flex-col mx-4 p-2">
          <label htmlFor="goalCategory">Completed</label>
          <Input
            onClick={checkValue}
            name="complete"
            checked={newProject.complete}
            className="inline"
            type="checkbox"
          />
        </div> */}
      </div>

      <Button onClick={handleSubmit} className="w-full">
        Submit Project
      </Button>
    </Card>
  );
};

export default NewGoals;
