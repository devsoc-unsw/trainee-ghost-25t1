import { useState, useEffect } from 'react';
import Task from '../../components/Task/Task';
import { getTaskData } from '../../api/tasks';
import './ViewTask.css';
import Popup from '../../components/Popup';
import ExpandedTask from '../../components/Task/ExpandedTask';

function TaskContainer({title, filter}) {
    const [taskData, setTaskData] = useState([]);
    const [taskActive, setTaskActive] = useState(false);
    const [expandedTask, setExpandedTask] = useState(null);

    // Fetch the task information
    useEffect(() => {
        (async () => {
            const resData = await getTaskData(filter);
            // If an error happens, resData.data is null so make it an empty array and print error
            setTaskData(resData.data || []);
            if (!resData.data) {
                console.error(resData);
            }
        })();
    }, []);

    // When a task is clicked, expand it
    const handleTaskClick = (task) => {
        setTaskActive(true);
        setExpandedTask(task);
    }

    // Go through all the fetched tasks and format them as task components
    const displayTask = () => {
        return taskData.map((task, index) => {
            return <Task key={index} task={task} onClick={() => handleTaskClick(task)}/>
        });
    }

    return (
        <>
            <div className="task-container">
                <div className="task-container-title">{title}</div>
                {taskData.length === 0 ? <span className="empty-text">Nothing here!</span> : displayTask()}
            </div>

            <Popup active={taskActive}>
                <ExpandedTask task={expandedTask} setTaskActive={setTaskActive}/>
            </Popup>
        </>
    );
}

export default TaskContainer;