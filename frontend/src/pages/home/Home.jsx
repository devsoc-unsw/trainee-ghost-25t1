import { useContext, useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import "./Home.css";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router";
import Popup from "../../components/Popup";
import StatsTextBox from "../../components/StatsTextBox/StatsTextBox";
import CompletedTaskSummary from "../../components/CompletedTaskSummary/CompletedTaskSummary";
import Eevee from "../../assets/eevee-sample.png";
import ViewTask from "../ViewTask/ViewTask";
import CreateTask from "../CreateTask/CreateTask";
import Settings from "../Settings/Settings";


function Home() {
  const navigate = useNavigate();
  const { user, userLoading } = useContext(AuthContext);

  const [clicked, setClicked] = useState(null);

  if (userLoading) {
    return <Loading />;
  }

  useEffect(() => {
    // if the user doesn't exist or they dont have a team, redirect them to signup
    if (!userLoading && !user?.team_id) {
      navigate("/team-selection");
    }
  }, [user, userLoading, navigate]);

  var temporary_completed_tasks = {key: "Will and Kevin just completed a difficult task!"}
  var temporary_stats = [{key: "HP", value: "120"},
    {key: "Attack", value: "120"},
    {key: "Defence", value: "120"},
    {key: "Special Attack", value: "120"},
    {key: "Special Defence", value: "120"},
    {key: "Speed", value: "120"}
  ]

  return (
    <>
      <NavBar clicked={clicked} setClicked={setClicked} />
    
      <main className="home-page"> 
      {clicked === "home" ? (
        <>
          <div className="column-1">
            {/* Modify below later on to handle not just completed tasks but approval, overdue*/}
            <CompletedTaskSummary fields={temporary_completed_tasks} />
            <StatsTextBox fields={temporary_stats} />
            {/* Add task todo */}
          </div>
          <div className="column-2">
            <img src={Eevee} alt="Eevee" className="pokemon-image" />
          </div>
        </>
      ) : (
        <div className="pop-up">
          <Popup active={true}>
            {clicked === 'newTask' && <CreateTask/>}
            {clicked === 'profile' && <Settings/>}
            {clicked === 'viewTask' && <ViewTask title="My Tasks"/>}
          </Popup>
        </div>
      )}
      </main>
    </>
  );
}

export default Home;
