import { useContext, useState } from "react";
import Button from "../Button";
import TaskText from "./TaskText";
import { claimTaskCompleted, voteOnCompletion } from "../../api/tasks";
import "./Task.css";
import { HomeContext } from "../../context/homeContext";

// Component representing a Task when it is clicked on and expanded
function ExpandedTask({ task, setTaskActive, filter }) {
  const [buttonMsg, setButtonMsg] = useState("");

  const { setHomeData, homeData } = useContext(HomeContext);

  // Depends on if task is assigned, done (but need approval from someone), completed

  // Mark a given task as done by calling the backend
  const markDone = async (taskId) => {
    const resData = await claimTaskCompleted(taskId);
    if (resData.success) {
      setHomeData((prev) => ({
        ...prev,
        tasks: prev.tasks.map((task) => (
          taskId === task.id ? { ...task, task_status: "pending" } : task
        )),
      }));
      setButtonMsg("Task successfully marked as done!");
    } else {
      console.error(`Error: ${resData.error}`);
      setButtonMsg(resData.error || "Something went wrong, please try again");
    }
  };

  // Mark a given task as done by calling the backend
  const approve = async (taskId) => {
    const resData = await voteOnCompletion(taskId);
    if (resData.success) {
      setButtonMsg("Task successfully marked for approval!");
    } else {
      console.error(`Error: ${resData.error}`);
      setButtonMsg(resData.error || "Something went wrong, please try again");
    }
  };

  return (
    <>
      <div className="background-mask" onClick={() => setTaskActive(false)}>
        <div className="expanded-task" onClick={(e) => e.stopPropagation()}>
          <TaskText task={task} shouldTruncate={false} />
          {filter.taskStatus === "incomplete" && (
            <Button
              className="mark-done-btn"
              onClick={() => markDone(task.id)}
              topText={buttonMsg}
              innerText="Mark Done"
            />
          )}
          {filter.taskStatus === "pending" && (
            <Button
              className="mark-done-btn"
              onClick={() => approve(task.id)}
              topText={buttonMsg}
              innerText="Approve"
            />
          )}
          {/* If we have time turn this into a FUN Button -> It does absolutely nothing but maybe can make it shoot confetti?? */}
          {filter.taskStatus === "complete" && (
            <Button
              className="mark-done-btn"
              topText={buttonMsg}
              innerText="N/A"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ExpandedTask;
