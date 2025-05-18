import warning from '../assets/warning.png';
import './Task.css';

function Task({title, dueDate, assignedPeople, rewards}) {

    return (
        <>
            <div className="task">
                <img className ="warning" src={warning}/>
                <div>
                    <span className="task-title">{title}</span>
                    <br/>
                    <span className="task-date">Due: {dueDate}</span>
                    <br/>
                    <span className="task-assigned">Assigned To: {assignedPeople.join(', ')}</span>
                    <br/>
                    <span className="task-rewards">Rewards: {rewards.join(', ')}</span>
                </div>
            </div>
        </>
    );
}

export default Task;