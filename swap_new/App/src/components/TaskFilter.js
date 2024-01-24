import React from "react";

const TaskFilter = ({ onFilterChange }) => {
  return (
    <div>
      <label>
        Filter by Status:
        <select onChange={(e) => onFilterChange(e.target.value)}>
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </label>
    </div>
  );
};

export default TaskFilter;
