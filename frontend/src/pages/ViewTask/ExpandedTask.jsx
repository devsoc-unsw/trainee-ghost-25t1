import './ViewTask.css';

// Component representing a Task when it is clicked on and expanded
function ExpandedTask({setTaskActive}) {
    return (
        <>
            <div className="background-mask" onClick={() => setTaskActive(false)}>
                <div className="expanded-task" onClick={(e) => e.stopPropagation()}>
                    <button>Mark as done</button>
                </div>
            </div>
        </>
    );
}

export default ExpandedTask;