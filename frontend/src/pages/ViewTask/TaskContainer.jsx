import { useState } from "react";
import Task from "../../components/Task/Task";
import "./ViewTask.css";
import Popup from "../../components/Popup";
import ExpandedTask from "../../components/Task/ExpandedTask";
import missingno from "../../assets/missingno.png"


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
                     <div className="missing-poke-div">
                        <p className="nothing-txt">Nothing here!</p>
                        <img src={missingno} alt="" className="missing-no"/>
                      </div>
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
