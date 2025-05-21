import { useContext  } from "react";
import TaskContainer from "./TaskContainer";
import "./ViewTask.css";
import { TaskContext } from "../../context/taskContext";
import Loading from "../../components/Loading";

function ViewTask() {
  const { tasks, loading } = useContext(TaskContext);

  const incomplete = tasks ? tasks.filter((t) => t.task_status === "incomplete") : [];
  const pending = tasks ? tasks.filter((t) => t.task_status === "pending") : [];
  const complete = tasks ? tasks.filter((t) => t.task_status === "complete") : [];

  if (loading) {
    return <Loading/>
  }

  // If the import failed (Even empty arrays are truthy so dont worry about this)
  if (!tasks) {
    return (
        <div className="task-viewer">
            <p>Something went wrong fetching tasks</p>
        </div>
    )
  }
  return (
    <>
      <div className="task-viewer">
        {/* I changed this to incomplete tasks because I think you should be able to see all the tasks in your team */}
        <TaskContainer status="incomplete" tasks={incomplete} />
        <TaskContainer status="pending" tasks={pending} />
        <TaskContainer status="complete" tasks={complete} />
      </div>
    </>
  );
}

export default ViewTask;
