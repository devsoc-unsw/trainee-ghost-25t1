import './CompletedTaskSummary.css';
import badge from '../../assets/badge.png';

// Component that displays a completed task summary
// Input struct of fields: (key:string)
function CompletedTaskSummary({fields}) {

    return (
        <section className="completed-box">
            <div className="completion-image">
                <img src={badge} />
            </div>
            <div className="text-div">
                <p className='title'>{fields.key}</p>
                <p className='details'>Tap to see Details</p>
            </div>
        </section>
    )
}

export default CompletedTaskSummary;