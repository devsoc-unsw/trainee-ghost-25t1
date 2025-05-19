import './StatsTextBox.css';

// Component containing a form with a dynamic number stats to be displayed
// Input struct of fields: (key:string, value: string)[]
function StatsTextBox({stats}) {
    return (
        <>
        <section className="text-box">
            {/*Generate input fields from provided fields array*/}
            {Object.entries(stats).map(([key, val], index) => (
                <div key={index} className = "input-row">
                    <span className="text-key">{key}</span>
                    <span className="text-value">{val}</span>
                </div>
            ))}
        </section>
        </>
    )
}

export default StatsTextBox;