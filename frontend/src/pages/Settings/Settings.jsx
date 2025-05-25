import "./Settings.css";
import resetImg from "../../assets/reset.png";
import { useEffect, useState } from "react";
import { data, useNavigate } from "react-router";
import { getTeamData } from "../../api/tasks";
import {
  editTeamData,
  generateNewRandomCode,
  getRandomCode,
  leaveTeam,
  kickPlayerFromTeam,
} from "../../api/teams";
import cross from "../../assets/cross.svg";
import Modal from 'react-bootstrap/Modal';

const Settings = () => {
  const [teamData, setTeamData] = useState(null);
  const [joinCode, setJoinCode] = useState(null);

  const [teamName, setTeamName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [assignmentName, setAssignmentName] = useState("");

  const [error, setError] = useState(null);
  
  // Modal state for export pokemon
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [pokemonText, setPokemonText] = useState("");

  const navigate = useNavigate();

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
      setJoinCode(codeData?.joinCode);
    })();
  }, []);

  const handleResetCode = async () => {
    const codeData = await generateNewRandomCode();
    setJoinCode(codeData.joinCode);
  };

  // Actually upload stuff to the db
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

  // Leave the team and navigate back to team-selection
  // Currently only works after you refresh the page...
  const handleLeaveTeam = async () => {
    const resData = await leaveTeam();
    if (resData.sucess) {
      console.log(resData.message);
      navigate("/team-selection");
    } else {
      setError(resData.message || "Something went wrong, please try again");
    }
  }

  // Exports the pokemon for pokemon showdown
  const exportPokemon = async () => {
    try {
      console.log(teamData.team.pokemon_name)
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${teamData.team.pokemon_name}`);
      const data = await response.json();

      const pokemonData = {
        name: data.name.replace("-", " "),
        ability: data.abilities[0].ability.name.replace("-", " "),
        moves: data.moves.slice(0, 4).map(move => move.move.name.replace("-", " ")),
      };

      const exportString = 
        `${pokemonData.name} @ \n` +
        `Ability: ${pokemonData.ability}\n` +
        `EVs: 84 HP / 84 Atk / 84 Def / 84 SpA / 84 SpD / 84 Spe\n` +
        `Bashful Nature: \n` +
        `- ${pokemonData.moves[0]}\n` +
        `- ${pokemonData.moves[1]}\n` +
        `- ${pokemonData.moves[2]}\n` +
        `- ${pokemonData.moves[3]}\n`;

      handleShow();
      setPokemonText(exportString);
      return exportString;
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
      setPokemonText("Error fetching Pokémon data. Please try again.");
    };
  }

  const kickFromTeam = async (userId) => {
    const resData = await kickPlayerFromTeam(userId);
    if (resData.sucess) {
      console.log(resData.message);
    } else {
      setError(resData.message || "Something went wrong, please try again");
    }
  }

  const adminName = teamData?.members?.find(
    (member) => member.id === teamData.team.admin_user_id
  );

  return (
    <section id="settings-container" className="will-popup-menu-style">
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
              <div className="input-like-div">
                <div key={member.name} className="group-members">
                  {member.name}
                </div>
                <button className="remove-member-btn" onClick={() => kickFromTeam(member.id)}>
                  <img src={cross} className="cross-image" alt="Remove" />
                </button>
              </div>: null
            ))}
          </div>
          <button className="save-changes" onClick={exportPokemon}>
            Export Pokemon
          </button>
        </div>
      )}
      {error && <div className="error">{error}</div>}
      <button className="save-changes" onClick={handleSaveChanges}>
        Save Changes
      </button>
      <button className="leave-btn" onClick={handleLeaveTeam}>
        Leave Group
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Export Pokemon</Modal.Title>
        </Modal.Header>
        <Modal.Body>Copy Paste the below text into Pokemon Showdown to finish exporting your pokemon!</Modal.Body>
        <Modal.Body><pre>{pokemonText}</pre></Modal.Body>
      </Modal>

    </section>
  );
};

export default Settings;
