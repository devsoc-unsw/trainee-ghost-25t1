import "./CompletedTaskSummary.css";
import badge from "../../assets/badge.png";
import { useContext } from "react";
import { HomeContext } from "../../context/HomeContext";
// import mewfloat from "../../assets/mewfloat.gif";

// Component that displays a completed task summary
// Input struct of fields: (key:string)
function CompletedTaskSummary({setClicked}) {
  const { homeData } = useContext(HomeContext);

  console.log(homeData);
  const task = homeData?.notifications?.[0] || null;

  var text;
  if (task) {
    if (task.type = 'complete') {
      text = `${task.assignees} completed a task!`
    } else if (task.type = 'pending') {
      text = `${task.assignees} need you to approve a task for completion`
    } else if (task.type = 'overdue') {
      text = `${task.assignees} might need your help finishing a task...`
    }
  }
  return task ? (
    <section className="summary-box" onClick={() => setClicked("viewTask")}>
      <>
        <div className="summary-image">
          <img src={badge} />
        </div>
        <div className="text-div">
          <p className="title">{text}</p>
          <p className="details">Tap to see Details</p>
        </div>
      </>
    </section>
  ) : (
    <div></div>
  );
}

export default CompletedTaskSummary;

//     <>
//     {/* <div className="summary-image">
//         <img className="mewfloat-img" src={mewfloat}/>
//     </div>
//       <h2 className="no-tasks-done">
//         No tasks have been completed yet...
//       </h2> */}
// </>
