import "./Notifications.css";
import badge from "../../assets/badge.png";
import vote from "../../assets/vote.png";
import help from "../../assets/help.png";
import { useContext } from "react";
import { HomeContext } from "../../context/HomeContext";
// import mewfloat from "../../assets/mewfloat.gif";

// Component that displays a completed task summary
// Input struct of fields: (key:string)
function Notifications({setClicked}) {
  const { homeData } = useContext(HomeContext);

  console.log(homeData);
  const task = homeData?.notifications?.[0] || null;

  if (task) {
    if (task.type === 'completed') {
      return (
        <section className="completed-summary-box" onClick={() => setClicked("viewTask")}>
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
      );
    } else if (task.type === 'pending') {
      return (
        <section className="pending-summary-box" onClick={() => setClicked("viewTask")}>
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
      );
    } else if (task.type === 'overdue') {
      return (
        <section className="overdue-summary-box" onClick={() => setClicked("viewTask")}>
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
