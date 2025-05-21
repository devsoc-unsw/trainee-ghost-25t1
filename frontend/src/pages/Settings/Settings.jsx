import "./Settings.css";
import resetImg from "../../assets/reset.png";
import { useEffect, useState } from "react";
import { getTeamData } from "../../api/tasks";
import {
  editTeamData,
  generateNewRandomCode,
  getRandomCode,
} from "../../api/teams";

const Settings = () => {
  const [teamData, setTeamData] = useState(null);
  const [joinCode, setJoinCode] = useState(null);

  const [teamName, setTeamName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [assignmentName, setAssignmentName] = useState("");

  const [error, setError] = useState(null);

  // We can determine if the current user is admin by checking if the join code fetch was successful
  const isAdmin = Boolean(joinCode);

  useEffect(() => {
    (async () => {
      const data = await getTeamData();
      setTeamData(data);

      // initialise controlled states
      setTeamName(data.team.name);
      setClassCode(data.team.class_code);
      setAssignmentName(data.team.assignment);

      // Only admins will be able to access the access code
      const codeData = await getRandomCode();
      setJoinCode(codeData.joinCode);
    })();
  }, []);

  const handleResetCode = async () => {
    const codeData = await generateNewRandomCode();
    setJoinCode(codeData.joinCode);
  };

  // Actually uplaod stuff to the db
  const handleSaveChanges = () => {
    const res = editTeamData({
      name: teamName,
      classCode: classCode,
      assignment: assignmentName,
    });
    if (!res.ok) {
      setError(res?.error);
    }
  };

  const adminName = teamData?.members?.find(
    (member) => member.id === teamData.team.admin_user_id
  );

  return (
    <section className="will-popup-menu-style">
      <h1>Settings</h1>
      {isAdmin && (
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
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              disabled={!isAdmin}
            />
          </div>

          <div className="input-and-label-container">
            <label htmlFor="class-code">Class code</label>
            <input
              className="class-code"
              id="class-code"
              placeholder="COMP1511"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              disabled={!isAdmin}
            />
          </div>

          <div className="input-and-label-container">
            <label htmlFor="assignment-name">Assignment Name</label>
            <input
              className="assignment-name"
              id="assignment-name"
              placeholder="Assignment 1"
              value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
              disabled={!isAdmin}
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
              className="admin-name input-like-div"
              id="admin-name"
            >
              {adminName.name}
            </div>
          </div>

          <div className="input-and-label-container">
            <h3>Group Members</h3>
            {teamData?.members.map((member) => (member.name !== adminName.name ?
              <div className="group-members input-like-div">
                {member.name}
              </div> : null
            ))}
          </div>
        </div>
      )}
      {error && <div className="error">{error}</div>}
      <button className="save-changes" onClick={handleSaveChanges}>
        Save Changes
      </button>
    </section>
  );
};

export default Settings;
