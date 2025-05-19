import './ToDoNotification.css';
import todo from '../../assets/ToDoNotificationImage.png';

// Component that displays a task that is due
// Input struct of fields: (title: string, dueDate: string, assignedTo: string[], reward: TODO_MAKE_NEW_STRUCT_FOR_REWARDS[])[]
function ToDoNotification({fields}) {

    const assignedUser = fields.assignedTo.map((user) => user).join(", ");

    return (
        <section className="notification-box">
            <div className="notification-image">
                <img src={todo} />
            </div>
            <div className="text-div">
                <p className='title'>{fields.title}</p>
                <p className='red'>Due {fields.dueDate}</p>
                <p>Assigned To: {assignedUser}</p>
                <div className='rewards'>
                    <p>Rewards: {fields.reward}</p>
                    {/* Add reward images here */}
                </div>
            </div>
        </section>
    )
}

export default ToDoNotification;