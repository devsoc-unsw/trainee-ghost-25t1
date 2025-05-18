import {useState} from 'react';
import InputBox from '../../components/InputBox';
import { joinTeam } from '../../api/teams';
import '../../components/InputBox.css';
import './Team.css';
import { useNavigate } from 'react-router';

function JoinTeam({setActive}) {
    const [ errorMsg, setErrorMsg ] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const resData = await joinTeam(data.randomCode);
        console.log(resData);
        if (resData.success) {
            // Navigate to the main team dashboard or something
            navigate("/");
        } else {
            setErrorMsg(resData.message || 'Something went wrong, please try again');
        }
    }

    return (
        <>
            <div className="background-mask" onClick={() => setActive(false)}>
                {/*Prevent popup from closing when you click the input box*/}
                <div className="join input-box" onClick={(e) => e.stopPropagation()}>
                    Join Team
                   <InputBox
                    fields={[
                        {name: "Team Code", value: "randomCode"}
                    ]}
                    buttonText="Join Team"
                    buttonTopText={errorMsg}
                    onSubmit={onSubmit}/>
                </div>
            </div>
        </>
    );
}

export default JoinTeam;