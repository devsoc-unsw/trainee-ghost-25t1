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
import Loading from "../../components/Loading";
import ToDoNotification from "../../components/ToDoNotification/ToDoNotification";
import TeamDetail from "../../components/TeamDetail/TeamDetail";


function Home() {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const [clicked, setClicked] = useState("home");

  useEffect(() => {
    // if the user doesn't exist or they dont have a team, redirect them to signup
    if (!loading && !user?.team_id) {
      navigate("/team-selection");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <Loading />;
  }

  // "Stubs for now"
  let temp_completed_tasks = {key: "Will and Kevin just completed a difficult task!"}
  let temp_stats = [{key: "HP", value: "120"},
    {key: "Attack", value: "120"},
    {key: "Defence", value: "120"},
    {key: "Special Attack", value: "120"},
    {key: "Special Defence", value: "120"},
    {key: "Speed", value: "120"}
  ]
  let temp_task = {title: "Complete adminAuthUserFunction",
    dueDate: "2025-10-31",
    assignedTo: ["Kevin", "Alex"],
    reward: ["EXP", "Gold"]};

  return (
    <>
      <NavBar clicked={clicked} setClicked={setClicked} />

      {clicked === "home" && <TeamDetail />}
      <main className="home-page">
        {clicked === "home" ? (
          <>
            <div className="column-1">
              {/* Modify below later on to handle not just completed tasks but approval, overdue*/}
              <CompletedTaskSummary fields={temp_completed_tasks} />
              <StatsTextBox fields={temp_stats} />
              <ToDoNotification fields={temp_task} />
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
