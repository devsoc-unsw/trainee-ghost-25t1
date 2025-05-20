import { useContext } from 'react';
import { AuthContext } from "../../context/authContext";
import TaskContainer from './TaskContainer';
import './ViewTask.css';

function ViewTask() {
    const { user, loading } = useContext(AuthContext);

    // Only show incomplete tasks assigned to the user
    const incompleteFilter = {
        assignedTo: user.id,
        taskStatus: 'incomplete'
    };

    // Show all pending tasks, regardless of who it was assigned to
    const pendingFilter = {
        taskStatus: 'pending'
    };

    // Show all completed tasks, regardless of who it was assigned to
    const completeFilter = {
        taskStatus: 'complete'
    };

    return (
        <>
            <div className="task-viewer">
                <TaskContainer title="My Tasks" filter={incompleteFilter}/>
                <TaskContainer title="Tasks For Review" filter={pendingFilter}/>
                <TaskContainer title="Completed Tasks" filter={completeFilter}/>
            </div>
        </>
    );
}

export default ViewTask;