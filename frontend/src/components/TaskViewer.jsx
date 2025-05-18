import Task from './Task';
import './Task.css';

function TaskViewer({title}) {

    return (
        <>
        {/* Remove ALL this later, this is just here to test the styling */}
            <div className="task-viewer">
                <h1>{title}</h1>
                <Task
                    title="Complete adminAuthUserFunction"
                    dueDate="Tomorrow"
                    assignedPeople={["Kevin", "Alex"]}
                    rewards={["apples", "berries"]}
                />
            </div>
        </>
    );
}

export default TaskViewer;