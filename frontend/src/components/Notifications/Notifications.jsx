import "./Notifications.css";
import badge from "../../assets/badge.png";
import vote from "../../assets/vote.png";
import help from "../../assets/help.png";
import { useContext, useState } from "react";
import { HomeContext } from "../../context/HomeContext";
import Popup from "../Popup";
import ExpandedTask from "../Task/ExpandedTask";
// import mewfloat from "../../assets/mewfloat.gif";

// Component that displays a completed task summary
// Input struct of fields: (key:string)
function Notifications() {
  const { homeData } = useContext(HomeContext);
  
  const [taskActive, setTaskActive] = useState(false);

  const [expandedTask, setExpandedTask] = useState(null);
  const handleTaskClick = (task) => {
    setTaskActive(true);
    setExpandedTask(task);
  };

  const task = homeData?.notifications || null;

  if (task) {
    if (task.type === 'completed') {
      return (
        <section className="notifications-section">
          <section className="completed-summary-box" onClick={() => handleTaskClick(task)}>
            <>
              <div className="summary-image">
                <img src={badge} />
              </div>
              <div className="text-div">
                <p className="title">{`${task.asignees} completed a task!`}</p>
                <p className="details">Tap to see Details</p>
              </div>
            </>
          </section>

          <Popup active={taskActive}>
            <ExpandedTask task={expandedTask} setTaskActive={setTaskActive} filter = {{taskStatus: 'complete'}}/>
          </Popup>
        </section>
      );
    } else if (task.type === 'pending') {
      return (
        <section className="notifications-section">
          <section className="pending-summary-box" onClick={() => handleTaskClick(task)}>
            <>
              <div className="summary-image">
                <img src={vote} />
              </div>
              <div className="text-div">
                <p className="title">{`${task.asignees} needs you to approve a task for completion`}</p>
                <p className="details">Tap to see Details</p>
              </div>
            </>
          </section>

          <Popup active={taskActive}>
            <ExpandedTask task={expandedTask} setTaskActive={setTaskActive} filter = {{taskStatus: 'complete'}}/>
          </Popup>
        </section>
      );
    } else if (task.type === 'overdue') {
      return (
        <section className="notifications-section">
          <section className="overdue-summary-box" onClick={() => handleTaskClick(task)}>
            <>
              <div className="summary-image">
                <img src={help} />
              </div>
              <div className="text-div">
                <p className="title">{`${task.asignees} might need your help finishing a task...`}</p>
                <p className="details">Tap to see Details</p>
              </div>
            </>
          </section>

          <Popup active={taskActive}>
            <ExpandedTask task={expandedTask} setTaskActive={setTaskActive} filter = {{taskStatus: 'complete'}}/>
          </Popup>
        </section>
      );
    };
  };
  return (
    <div></div>
  );
}

export default Notifications;

//     <>
//     {/* <div className="summary-image">
//         <img className="mewfloat-img" src={mewfloat}/>
//     </div>
//       <h2 className="no-tasks-done">
//         No tasks have been completed yet...
//       </h2> */}
// </>
