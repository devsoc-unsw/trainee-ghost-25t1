import warning from '../assets/warning.png';
import './Task.css';

function Task({title, description, dueDate, taskDoers, difficulty, rewards}) {
    taskDoers = taskDoers.map((doer) => doer.name);
    return (
        <>
            <div className="task">
                <img className ="warning" src={warning}/>
                <div className="task-text">
                    <span className="task-title">{title}</span>
                    <br/>
                    <span className="task-description">Description: {description}</span>
                    <br/>
                    <span className="task-date">Due: {dueDate}</span>
                    <br/>
                    <span className="task-assigned">Assigned To: {taskDoers.join(', ')}</span>
                    <br/>
                    <span className="task-difficulty">Difficulty: {difficulty}/10</span>
                    <br/>
                    <span className="task-rewards">Rewards: {rewards.join(', ')}</span>
                </div>
            </div>
        </>
    );
}

export default Task;