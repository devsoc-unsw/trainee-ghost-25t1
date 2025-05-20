import './ViewTask.css';
import TaskContainer from './TaskContainer';

function ViewTask() {
    return (
        <>
            <div className="task-viewer">
                <TaskContainer title="My Tasks"/>
                <TaskContainer title="Tasks For Review"/>
                <TaskContainer title="Completed Tasks"/>
            </div>
        </>
    );
}

export default ViewTask;