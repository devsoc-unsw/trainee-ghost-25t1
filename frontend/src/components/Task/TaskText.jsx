import './Task.css'

function TaskText({title, description, dueDate, taskDoers, difficulty, rewards}) {
    return (
        <>
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
        </>
    );
}

export default TaskText;