import './Task.css';
import Button from '../Button';
import TaskText from './TaskText';

// Component representing a Task when it is clicked on and expanded
function ExpandedTask({task, setTaskActive}) {
    return (
        <>
            <div className="background-mask" onClick={() => setTaskActive(false)}>
                <div className="expanded-task" onClick={(e) => e.stopPropagation()}>
                    <TaskText task={task} shouldTruncate={false}/>
                    <Button className="mark-done-btn" topText="Task successfully claimed as done!" innerText="Mark Done"/>
                </div>
            </div>
        </>
    );
}

export default ExpandedTask;