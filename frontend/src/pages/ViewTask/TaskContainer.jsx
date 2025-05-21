import { useState } from "react";
import Task from "../../components/Task/Task";
import "./ViewTask.css";
import Popup from "../../components/Popup";
import ExpandedTask from "../../components/Task/ExpandedTask";

function TaskContainer({ status, tasks }) {
  const [taskActive, setTaskActive] = useState(false);
  const [expandedTask, setExpandedTask] = useState(null);

  // When a task is clicked, expand it
  const handleTaskClick = (task) => {
    setTaskActive(true);
    setExpandedTask(task);
  };

  const statusToTitle = {
    incomplete: "Incomplete tasks",
    pending: "Tasks For Review",
    complete: "Completed Tasks",
  };

  return (
    <>
      <div className="task-container">
        <div className="task-container-title">{statusToTitle[status]}</div>
        {tasks.length === 0 ? (
          <span className="empty-text">Nothing here!</span>
        ) : (
          tasks.map((task, index) => (
            <Task
              key={index}
              task={task}
              onClick={() => handleTaskClick(task)}
            />
          ))
        )}
      </div>

      <Popup active={taskActive}>
        <ExpandedTask
          task={expandedTask}
          setTaskActive={setTaskActive}
          status={status}
        />
      </Popup>
    </>
  );
}

export default TaskContainer;
