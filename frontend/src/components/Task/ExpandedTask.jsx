import './Task.css';
import TaskText from './TaskText';

// Component representing a Task when it is clicked on and expanded
function ExpandedTask({task, setTaskActive}) {
    const dueDate = new Date(task.due_date).toLocaleDateString('en-AU');
    const taskDoers = task.taskDoers.map((doer) => doer.name);
    const rewards = ["apples", "berries"];

    return (
        <>
            <div className="background-mask" onClick={() => setTaskActive(false)}>
                <div className="expanded-task" onClick={(e) => e.stopPropagation()}>
                    <TaskText
                        title={task.title}
                        description={task.description}
                        dueDate={dueDate}
                        taskDoers={taskDoers}
                        difficulty={task.difficulty}
                        rewards={rewards}
                    />
                </div>
            </div>
        </>
    );
}

export default ExpandedTask;