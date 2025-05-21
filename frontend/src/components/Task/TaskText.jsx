import rewardMap from '../../utils/rewardMap';
import './Task.css';

function TaskText({task, shouldTruncate}) {
    const currDate = new Date();
    const dueDate = new Date(task.due_date);

    let overdue = false;
    if (dueDate.getTime() < currDate.getTime()) {
        overdue = true;
    }

    const taskDoers = task.taskDoers.map((doer) => doer.name);
    const reward = rewardMap[task.difficulty];

    // Adds truncate class to text if option selected in props and makes text red if overdue
    const resolveClassName = (className) => {
        let resolvedClass = className.concat(shouldTruncate ? " truncate" : " expanded-text");
        if (overdue) {
            resolvedClass = resolvedClass.concat(" red");
        }
        return resolvedClass;
    }

    return (
        <>
            <div className="task-text">
                <div className={resolveClassName("task-title")}><b>{task.title}</b></div>
                <div className={resolveClassName("task-description")}>
                    <b>Description: </b>
                    <i>{task.description}</i>
                </div>
                <div className={resolveClassName("task-date")}>
                    <b>Due: </b>
                    <i>{dueDate.toLocaleDateString('en-AU')}</i>
                </div>
                <div className={resolveClassName("task-assigned")}>
                    <b>Assigned To: </b>
                    <i>{taskDoers.join(', ')}</i>
                </div>
                <div className={resolveClassName("task-difficulty")}>
                    <b>Difficulty: </b>
                    <i>{task.difficulty}/10</i>
                </div>
                <div className={resolveClassName("task-reward")}>
                    <b>Rewards: </b>
                    <img className={shouldTruncate ? "small-reward" : "large-reward"} src={reward}/>
                </div>
                <div className={resolveClassName("task-status")}>
                    <b>Status: </b>
                    <i>{overdue ? "overdue" : task.task_status}</i>
                </div>
            </div>
        </>
    );
}

export default TaskText;