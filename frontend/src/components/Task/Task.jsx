import warning from '../../assets/warning.png';
import TaskText from './TaskText';
import './Task.css';

// Component representing a regular task to be displayed by a task viewer
function Task({task, onClick}) {
    const dueDate = new Date(task.due_date).toLocaleDateString('en-AU');
    const taskDoers = task.taskDoers.map((doer) => doer.name);
    const rewards = ["apples", "berries"];

    return (
        <>
            <div className="task" onClick={onClick}>
                <img className="warning" src={warning}/>
                <TaskText
                    title={task.title}
                    description={task.description}
                    dueDate={dueDate}
                    taskDoers={taskDoers}
                    difficulty={task.difficulty}
                    rewards={rewards}
                />
            </div>
        </>
    );
}

export default Task;