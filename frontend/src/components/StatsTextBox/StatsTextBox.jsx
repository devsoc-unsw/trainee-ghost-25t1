import './StatsTextBox.css';

// Component containing a form with a dynamic number stats to be displayed
// Input struct of fields: (key:string, value: string)[]
function StatsTextBox({fields}) {

    return (
        <>
        <section className="text-box">
            {/*Generate input fields from provided fields array*/}
            {fields.map((field, index) => (
                <div key={index} className = "input-row">
                    <span className="text-key">{field.key}</span>
                    <span className="text-value">{field.value}</span>
                </div>
            ))}
        </section>
        </>
    )
}

export default StatsTextBox;