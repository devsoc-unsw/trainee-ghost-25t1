import warning from '../../assets/warning.png';
import TaskText from './TaskText';
import './Task.css';

// Component representing a regular task to be displayed by a task viewer
function Task({task, onClick}) {
    return (
        <>
            <div className="task" onClick={onClick}>
                <img className="warning" src={warning}/>
                <TaskText task={task} shouldTruncate={true}/>
            </div>
        </>
    );
}

export default Task;