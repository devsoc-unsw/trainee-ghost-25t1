import { useContext, useState } from "react";
import NavBar from "../../components/NavBar";
import "./Home.css";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router";
import ViewTask from "../ViewTask/ViewTask";
import Popup from "../../components/Popup";
import CreateTask from "../CreateTask/CreateTask";
import Settings from "../Settings/Settings";


function Home() {
  const navigate = useNavigate();
  const { user, userLoading } = useContext(AuthContext);

  console.log(userLoading)

  const [clicked, setClicked] = useState(null);

  if (userLoading) {
    return <Loading />;
  }

  // if the user dosent exist or they dont have a team, redirect them to signup
  if (user?.team_id) {
    navigate("/signup");
  }

  return (
    <main className="home-page">
      <div className="col1">
        <NavBar clicked={clicked} setClicked={setClicked} />
      </div>
      <div className="col2"></div>
      <div className="col3"></div>
      {clicked !== "home" && (
        <Popup active={true}>
            {clicked === 'newTask' && <CreateTask/>}
            {clicked === 'profile' && <Settings/>}
        </Popup>
      )}

      {clicked !== "home" && (
        <Popup active={true}>
            {clicked === 'viewTask' && <ViewTask title="My Tasks"/>}
        </Popup>
      )}
    </main>
  );
}

export default Home;
