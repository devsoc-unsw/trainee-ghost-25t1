import InputBox from './InputBox';
import './InputBox.css';
import './Team.css';

function CreateTeam({setActive}) {

/*
 * @param {string} req.body.name - Name of the team
 * @param {string} req.body.classCode - UNSW class code  (like COMP1511)
 * @param {string} req.body.assignment - Name of the assignment
 * @param {string} [req.body.pokemonName]
*/

    return (
        <>
            <div className="background-mask" onClick={() => setActive(false)}>
                {/*Prevent team popup from closing when you click it*/}
                <div className="input-box" onClick={(e) => e.stopPropagation()}>
                    Create Team
                   <InputBox
                    fields={[
                        {name: "New Team Name", value: "teamName"},
                        {name: "Class Code (e.g. COMP1511)", value: "classCode"},
                        {name: "Assignment Name", value: "assignmentName"}
                    ]}
                    buttonText="Create Team"
                    buttonTopText = ""
                    onSubmit={() => console.log('hello world!')}/>
                </div>
            </div>
        </>
    );
}

export default CreateTeam;