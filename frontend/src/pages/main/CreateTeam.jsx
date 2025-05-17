import {useState} from 'react';
import InputBox from '../../components/InputBox';
import { createTeam } from '../../api/teams';
import '../../components/InputBox.css';
import './Team.css';

function CreateTeam({setActive}) {
    const [ errorMsg, setErrorMsg ] = useState('');

    const onSubmit = async (data) => {
        const resData = await createTeam(data.teamName, data.classCode, data.assignment, data.pokemonName);
        console.log(resData);
        if (resData.success) {
            console.log('yay it worked!')
            const d = await fetch('http://localhost:5000/api/teams/settings', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            })
            const e = d.json();
            console.log(e)
            // Navigate to the main dashboard or something
        } else {
            setErrorMsg(resData.error || 'Something went wrong, please try again');
        }
    }

    return (
        <>
            <div className="background-mask" onClick={() => setActive(false)}>
                {/*Prevent popup from closing when you click the input box*/}
                <div className="create input-box" onClick={(e) => e.stopPropagation()}>
                    Create Team
                   <InputBox
                    fields={[
                        {name: "New Team Name", value: "teamName"},
                        {name: "Class Code (e.g. COMP1511)", value: "classCode"},
                        {name: "Assignment Name", value: "assignment"},
                        {name: "Team Pokemon (e.g. pikachu)", value: "pokemonName"}
                    ]}
                    buttonText="Create Team"
                    buttonTopText={errorMsg}
                    onSubmit={onSubmit}/>
                </div>
            </div>
        </>
    );
}

export default CreateTeam;