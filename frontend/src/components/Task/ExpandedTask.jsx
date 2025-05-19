import './Task.css';
import TaskText from './TaskText';

// Component representing a Task when it is clicked on and expanded
function ExpandedTask({task, setTaskActive}) {
    return (
        <>
            <div className="background-mask" onClick={() => setTaskActive(false)}>
                <div className="expanded-task" onClick={(e) => e.stopPropagation()}>
                    <TaskText task={task} shouldTruncate={false}/>
                    <button className="mark-done-btn">Mark Done</button>
                </div>
            </div>
        </>
    );
}

export default ExpandedTask;