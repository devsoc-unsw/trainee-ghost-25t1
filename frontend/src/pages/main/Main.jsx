import { useState } from 'react'
import createTeamBtn from '../../assets/createTeam.png';
import joinTeamBtn from '../../assets/joinTeam.png';
import pikachu from '../../assets/running.gif';
import CreateTeam from '../../components/CreateTeam';
import Popup from '../../components/Popup';
import './Main.css'

function Main() {
    const [createActive, setCreateActive] = useState(false);
    const [joinActive, setJoinActive] = useState(false);

    return (
        <>
            <div className='main-box'>
                <h1>Welcome!</h1>
                <h2>Set off on your journey to be the very best...</h2>
                <img className='create-team-button' src={createTeamBtn} onClick={() => setCreateActive(true)}/>
                <img className='join-team-button' src={joinTeamBtn}/>
                <img className='pikachu' src={pikachu}/>
            </div>
            <Popup active={createActive}>
                <CreateTeam setActive={setCreateActive}></CreateTeam>
            </Popup>
        </>
    )
}

export default Main
