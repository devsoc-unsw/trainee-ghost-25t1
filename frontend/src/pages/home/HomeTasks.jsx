import { useState } from "react";
import Task from "../../components/Task/Task";
import ExpandedTask from "../../components/Task/ExpandedTask";
import Popup from "../../components/Popup";

const HomeTasks = ({ tasks }) => {
  const [taskActive, setTaskActive] = useState(false);

  const [expandedTask, setExpandedTask] = useState(null);
  const handleTaskClick = (task) => {
    setTaskActive(true);
    setExpandedTask(task);
  };
  return (
    <section className="home-tasks-section">
      {tasks.map((task, index) => (
        <Task task={task} key={index} onClick={() => handleTaskClick(task)}></Task>
      ))}
      {/* WE have this button but i dont like it, and it dosent work */}
        {/* <button className="view-all-tasks-btn">View all</button> */}
      <Popup active={taskActive}>
        <ExpandedTask task={expandedTask} setTaskActive={setTaskActive} />
      </Popup>
    </section>
  );
};

export default HomeTasks;
