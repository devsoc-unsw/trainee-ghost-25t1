import { useContext, useState } from 'react';
import Button from '../Button';
import TaskText from './TaskText';
import { claimTaskCompleted, voteOnCompletion } from '../../api/tasks';
import './Task.css';
import { TaskContext } from '../../context/TaskContext';

// Component representing a Task when it is clicked on and expanded
function ExpandedTask({task, setTaskActive, status}) {
    const [buttonMsg, setButtonMsg] = useState("");
    const { refreshTasks } = useContext(TaskContext);

    // Depends on if task is assigned, done (but need approval from someone), completed

    // Mark a given task as done by calling the backend
    const markDone = async (taskId) => {
        const resData = await claimTaskCompleted(taskId);
        console.log(resData);

        if (resData.success) {
            await refreshTasks()
            setButtonMsg("Task successfully marked as done!");
        } else {
            console.error(`Error: ${resData.error}`);
            setButtonMsg(resData.error || "Something went wrong, please try again");
        }
    }

    // Mark a given task as done by calling the backend
    const approve = async (taskId) => {
        const resData = await voteOnCompletion(taskId);
        console.log(resData);

        if (resData.success) {
            await refreshTasks()
            setButtonMsg("Task successfully marked for approval!");
        } else {
            console.error(`Error: ${resData.error}`);
            setButtonMsg(resData.error || "Something went wrong, please try again");
        }
    }

    return (
        <>
            <div className="background-mask" onClick={() => setTaskActive(false)}>
                <div className="expanded-task" onClick={(e) => e.stopPropagation()}>
                    <TaskText task={task} shouldTruncate={false}/>
                    {status === 'incomplete' && (
                        <Button className="mark-done-btn" onClick={() => markDone(task.id)} topText={buttonMsg} innerText="Mark Done"/>
                    )}
                    {status === 'pending' && (
                        <Button className="mark-done-btn" onClick={() => approve(task.id)} topText={buttonMsg} innerText="Approve"/>
                    )}
                    {/* If we have time turn this into a FUN Button -> It does absolutely nothing but maybe can make it shoot confetti?? */}
                    {status === 'complete' && (
                        <Button className="mark-done-btn" topText={buttonMsg} innerText="N/A"/>
                    )}

                </div>
            </div>
        </>
    );
}

export default ExpandedTask;