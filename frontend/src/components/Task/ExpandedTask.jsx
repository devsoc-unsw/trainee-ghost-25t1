import { useState } from 'react';
import Button from '../Button';
import TaskText from './TaskText';
import { claimTaskCompleted } from '../../api/tasks';
import './Task.css';

// Component representing a Task when it is clicked on and expanded
function ExpandedTask({task, setTaskActive}) {
    const [buttonMsg, setButtonMsg] = useState("");

    // Mark a given task as done by calling the backend
    const markDone = async (taskId) => {
        const resData = await claimTaskCompleted(taskId);
        console.log(resData);

        if (resData.success) {
            setButtonMsg("Task successfully marked as done!");
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
                    <Button className="mark-done-btn" onClick={() => markDone(task.id)} topText={buttonMsg} innerText="Mark Done"/>
                </div>
            </div>
        </>
    );
}

export default ExpandedTask;