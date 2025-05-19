import warning from '../assets/warning.png';
import './Task.css';

function Task({title, description, dueDate, taskDoers, difficulty, rewards}) {
    taskDoers = taskDoers.map((doer) => doer.name);
    return (
        <>
            <div className="task">
                <img className ="warning" src={warning}/>
                <div className="task-text">
                    <span className="task-title"><b>{title}</b></span>
                    <br/>
                    <span className="task-description">
                        <b>Description: </b>
                        <i>{description}</i>
                    </span>
                    <br/>
                    <span className="task-date">
                        <b>Due: </b>
                        <i>{dueDate}</i>
                    </span>
                    <br/>
                    <span className="task-assigned">
                        <b>Assigned To: </b>
                        <i>{taskDoers.join(', ')}</i>
                    </span>
                    <br/>
                    <span className="task-difficulty">
                        <b>Difficulty: </b>
                        <i>{difficulty}/10</i>
                    </span>
                    <br/>
                    <span className="task-rewards">
                        <b>Rewards: </b>
                        <i>{rewards.join(', ')}</i>
                    </span>
                </div>
            </div>
        </>
    );
}

export default Task;