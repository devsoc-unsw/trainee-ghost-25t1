import './Task.css'

function TaskText({task, shouldTruncate}) {
    const dueDate = new Date(task.due_date).toLocaleDateString('en-AU');
    const taskDoers = task.taskDoers.map((doer) => doer.name);
    const rewards = ["apples", "berries"];

    // Adds truncate class to text if option selected in props
    const conditionalTruncate = (className) => {
        return className.concat(shouldTruncate ? " truncate" : " expanded-text");
    }

    return (
        <>
            <div className="task-text">
                <div className={conditionalTruncate("task-title")}><b>{task.title}</b></div>
                <div className={conditionalTruncate("task-description")}>
                    <b>Description: </b>
                    <i>{task.description}</i>
                </div>
                <div className={conditionalTruncate("task-date")}>
                    <b>Due: </b>
                    <i>{dueDate}</i>
                </div>
                <div className={conditionalTruncate("task-assigned")}>
                    <b>Assigned To: </b>
                    <i>{taskDoers.join(', ')}</i>
                </div>
                <div className={conditionalTruncate("task-difficulty")}>
                    <b>Difficulty: </b>
                    <i>{task.difficulty}/10</i>
                </div>
                <div className={conditionalTruncate("task-rewards")}>
                    <b>Rewards: </b>
                    <i>{rewards.join(', ')}</i>
                </div>
                <div className={conditionalTruncate("task-status")}>
                    <b>Status: </b>
                    <i>{task.task_status}</i>
                </div>
            </div>
        </>
    );
}

export default TaskText;