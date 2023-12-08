import React, { useState, useContext, createContext, useEffect } from "react";

interface Task {

}
const taskContext = createContext<Task>({})

const useTasks = () => {
  return <div>useTasks</div>;
};

export default useTasks;
