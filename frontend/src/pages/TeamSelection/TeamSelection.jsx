import { useContext, useEffect, useState } from "react";
import createTeamBtn from "../../assets/createTeam.png";
import joinTeamBtn from "../../assets/joinTeam.png";
import pikachu from "../../assets/running.gif";
import CreateTeam from "./CreateTeam";
import JoinTeam from "./JoinTeam";
import Popup from "../../components/Popup";
import "./TeamSelection.css";
import { AuthContext } from "../../context/authContext";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router";

function TeamSelection() {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const [createActive, setCreateActive] = useState(false);
  const [joinActive, setJoinActive] = useState(false);

  useEffect(() => {
    // if the user doesn't exist, redirect them to signup
    if (!loading && !user) {
      navigate("/signup");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="main-box">
        <h1>Welcome!</h1>
        <h2>Set off on your journey to be the very best...</h2>
        <img
          className="create-team-button"
          src={createTeamBtn}
          onClick={() => setCreateActive(true)}
        />
        <img
          className="join-team-button"
          src={joinTeamBtn}
          onClick={() => setJoinActive(true)}
        />
        <img className="pikachu" src={pikachu} />
      </div>
      <Popup active={createActive}>
        <CreateTeam setActive={setCreateActive}></CreateTeam>
      </Popup>
      <Popup active={joinActive}>
        <JoinTeam setActive={setJoinActive}></JoinTeam>
      </Popup>
    </>
  );
}

export default TeamSelection;
