import warning from '../assets/warning.png';
import './Task.css';

function Task({title, description, dueDate, taskDoers, difficulty, rewards, onClick}) {
    taskDoers = taskDoers.map((doer) => doer.name);
    return (
        <>
            <div className="task" onClick={onClick}>
                <img className ="warning" src={warning}/>
                <div className="task-text">
                    <span className="truncate task-title"><b>{title}</b></span>
                    <span className="truncate task-description">
                        <b>Description: </b>
                        <i>{description}</i>
                    </span>
                    <span className="truncate task-date">
                        <b>Due: </b>
                        <i>{dueDate}</i>
                    </span>
                    <span className="truncate task-assigned">
                        <b>Assigned To: </b>
                        <i>{taskDoers.join(', ')}</i>
                    </span>
                    <span className="truncate task-difficulty">
                        <b>Difficulty: </b>
                        <i>{difficulty}/10</i>
                    </span>
                    <span className="truncate task-rewards">
                        <b>Rewards: </b>
                        <i>{rewards.join(', ')}</i>
                    </span>
                </div>
            </div>
        </>
    );
}

export default Task;