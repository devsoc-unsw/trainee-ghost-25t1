import "./Settings.css";
import resetImg from "../../assets/reset.png";
import { useEffect, useState } from "react";
import { getTeamData } from "../../api/tasks";
import { generateNewRandomCode, getRandomCode } from "../../api/teams";

const Settings = () => {
  const [teamData, setTeamData] = useState(null);
  const [joinCode, setJoinCode] = useState(null);

  useEffect(() => {
    (async () => {
      const teamData = await getTeamData();
      setTeamData(teamData);
      // Only admins will be able to access the access coed
      const codeData = await getRandomCode();
      setJoinCode(codeData.joinCode);
    })();
  }, []);

  const handleResetCode = async () => {
    const codeData = await generateNewRandomCode();
    setJoinCode(codeData.joinCode);
  }

  const adminName = teamData?.members?.find(
    (member) => member.id === teamData.team.admin_user_id
  );

  return (
    <section className="will-popup-menu-style">
      <h1>Settings</h1>
      {teamData && (
        <div className="core-settings-data">
          {joinCode && (
            <div className="input-and-label-container">
              <h3>Access code</h3>
              <div className="access-code-and-button" id="access-code">
                <div className="access-code-container input-like-div">
                  {teamData && joinCode}
                </div>
                <button className="reset-access-code" onClick={handleResetCode}>
                  <img src={resetImg} alt="Reset" />
                </button>
              </div>
            </div>
          )}
          <div className="input-and-label-container">
            <label htmlFor="team-name">Team name</label>
            <input
              className="team-name"
              id="team-name"
              placeholder="Team Rocket"
              value={teamData?.team.name}
            />
          </div>
          <div className="input-and-label-container">
            <label htmlFor="course-code">Course code</label>
            <input
              className="course-code"
              id="course-code"
              placeholder="COMP1511"
              value={teamData.team.class_code}
            />
          </div>
          <div className="input-and-label-container">
            <label htmlFor="assignment-name">Assignment Name</label>
            <input
              className="assignment-name"
              id="assignment-name"
              placeholder="Assignment 1"
              value={teamData.team.assignment}
            />
          </div>
          <div className="input-and-label-container">
            <h3>Pokemon character</h3>
            <div
              className="pokemon-character input-like-div"
              id="pokemon-character"
            >
              {teamData.team.pokemon_name}
            </div>
          </div>
          <div className="input-and-label-container">
            <h3>Admin Name</h3>
            <div
              className="pokemon-character input-like-div"
              id="pokemon-character"
            >
              {adminName.name}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Settings;
