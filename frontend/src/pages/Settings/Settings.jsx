import "./Settings.css";
import resetImg from '../../assets/reset.png'
import { useEffect, useState } from "react";
import { getTeamData } from "../../api/tasks";

const Settings = () => {
    const [teamData, setTeamData] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await getTeamData();
            setTeamData(data);
        })();
    }, []);

    console.log(teamData)

    // const adminName = teamData?.members?.find(member => member.id === teamData.team.admin_user_id)

return (
    <section className="will-popup-menu-style">
        <h1>Settings</h1>
        <div className="core-settings-data">
            <div className="input-and-label-container">
                <h3>Access code</h3>
                <div className="access-code-and-button" id="access-code">
                    <div className="access-code-container input-like-div">
                        {teamData && 'S3jd67ss'}
                    </div>
                    <button className="reset-access-code">
                        <img src={resetImg} alt="Reset" />
                    </button>
                </div>
            </div>
            <div className="input-and-label-container">
                <label htmlFor="team-name">Team name</label>
                <input className="team-name" id="team-name" placeholder="Team Rocket" value={teamData?.team.name}/>
            </div>
            <div className="input-and-label-container">
                <label htmlFor="course-code">Course code</label>
                <input className="course-code" id="course-code" placeholder="COMP1511" value={teamData.team.class_code}/>
            </div>
            <div className="input-and-label-container">
                <label htmlFor="assignment-name">Assignment Name</label>
                <input className="assignment-name" id="assignment-name" placeholder="Assignment 1" value={teamData.team.assignment}/>
            </div>
            <div className="input-and-label-container">
                <h3>Pokemon character</h3>
                <div className="pokemon-character input-like-div" id="pokemon-character">
                    {teamData.team.pokemon_name}
                </div>
            </div>
            <div className="input-and-label-container">
                <h3>Admin ID</h3>
                <div className="pokemon-character input-like-div" id="pokemon-character">
                    {/* {adminName.name} */}
                </div>
            </div>
        </div>
    </section>
)
};

export default Settings;
