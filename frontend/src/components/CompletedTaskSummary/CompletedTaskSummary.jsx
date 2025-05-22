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
  const task = homeData?.finished?.[0] || null;

  let difficulty_str;
if (task) {
    if (task.difficulty < 4) {
        difficulty_str = "easy";
    } else if (task.difficulty <= 6) {
        difficulty_str = "medium";
    } else if (task.difficulty <= 10) {
        difficulty_str = "hard";
    } else {
        difficulty_str = "unknown";
    }
}

//   Could maybe make it so it only appears if done recently
  const taskDoers = task?.taskDoers?.map(p => p.name).join(", ")
  const text = `${taskDoers} completed a ${difficulty_str} task!`

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
