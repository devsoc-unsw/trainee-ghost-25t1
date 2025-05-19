import { useState, useEffect, useContext } from 'react';
import Task from '../../components/Task';
import { getTaskData } from '../../api/tasks';
import { AuthContext } from "../../context/authContext";
import './ViewTask.css';
import Popup from '../../components/Popup';
import ExpandedTask from './ExpandedTask';

function ViewTask({title}) {
    const [taskData, setTaskData] = useState([]);
    const [taskActive, setTaskActive] = useState(false);
    const { user, loading } = useContext(AuthContext);

    // Fetch the task information
    useEffect(() => {
        (async () => {
            const resData = await getTaskData({assignedTo: user.id});
            // If an error happens, resData.data is null so make it an empty array and print error
            setTaskData(resData.data || []);
            if (!resData.data) {
                console.error(resData);
            }
        })();
    }, []);

    const onClick = () => {
        setTaskActive(true);
    }

    // Go through all the fetched tasks and format them as task components
    const displayTask = () => {
        return taskData.map((task, index) => {
            const d = new Date(task.due_date).toLocaleDateString('en-AU');
            return <Task
                key={index}
                title={task.title}
                description={task.description}
                dueDate={d}
                taskDoers={task.taskDoers}
                // Change this once we have a reward system implemented
                rewards={["apples", "berries"]}
                difficulty={task.difficulty}
                onClick={onClick}
            />
        });
    }

    return (
        <>
            <div className="task-viewer">
                <div className="task-viewer-title">{title}</div>
                {taskData.length === 0 ? <span className="done-text">All done!</span> : displayTask()}
            </div>

            <Popup active={taskActive}>
                <ExpandedTask setTaskActive={setTaskActive}/>

            </Popup>
        </>
    );
}

export default ViewTask;