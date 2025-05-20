import { useContext, useState, useEffect, useRef } from "react";
import NavBar from "../../components/NavBar";
import "./Home.css";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router";
import Popup from "../../components/Popup";
import StatsTextBox from "../../components/StatsTextBox/StatsTextBox";
import CompletedTaskSummary from "../../components/CompletedTaskSummary/CompletedTaskSummary";
import ViewTask from "../ViewTask/ViewTask";
import CreateTask from "../CreateTask/CreateTask";
import Settings from "../Settings/Settings";
import Loading from "../../components/Loading";
import ToDoNotification from "../../components/ToDoNotification/ToDoNotification";
import TeamDetail from "../../components/TeamDetail/TeamDetail";
import { getHomePageData } from "../../api/teams";
import { getPokemon } from "../../api/poke";
import extractStatsFromHomeData from "./extractStatsFromHomeData";
import follow from '../../assets/follow.gif';
import HomeTasks from "./HomeTasks";

function Home() {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const [clicked, setClicked] = useState("home");
  const [homeData, setHomeData] = useState(null);
  const [pokemon, setPokemon] = useState(null);
  const [isShaking, setIsShaking] = useState(false);

  // Random sound for now but later, get this from pokemon API
  // useRef to avoid reinstantiating Audio every rerender
  const pokemonSound = new Audio("https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/35.ogg");
  const soundRef = useRef(pokemonSound);

  const handlePokemonClick = () => {
    if (isShaking) {
      return;
    }
    soundRef.current.play()
    setIsShaking(true);

    // Stop shaking after animation is done and 600msecs have elapsed (prevent spam)
    setTimeout(() => setIsShaking(false), 1200);
  }


  useEffect(() => {
    // if the user doesn't exist or they dont have a team, redirect them to signup
    if (!loading && !user?.team_id) {
      navigate("/team-selection");
    }

    (async () => {
      const data = await getHomePageData();
      setHomeData(data.data);
    })();
  }, [user, loading, navigate]);

  useEffect(() => {
    (async () => {
      const name = homeData?.team?.team?.pokemon_name;
      if (homeData) {
        const pokeData = await getPokemon(name);
        setPokemon(pokeData);
      }
    })();
  }, [homeData]);

  if (loading) {
    return <Loading />;
  }

  // "Stubs for now"
  var temporary_completed_tasks = {
    key: "Will and Kevin just completed a difficult task!",
  };

  console.log(homeData);
  const statObj = extractStatsFromHomeData(homeData);

  return (
    <>
      <NavBar clicked={clicked} setClicked={setClicked} />

      {clicked === "home" && <TeamDetail />}
      <main className="home-page">
        {clicked === "home" ? (
          <>
            <div className="row-1">
              {/* Modify below later on to handle not just completed tasks but approval, overdue*/}
              <CompletedTaskSummary fields={temporary_completed_tasks} />
              {statObj && <StatsTextBox stats={statObj} />}
              {homeData?.tasks?.length > 0 ? (
                <HomeTasks tasks={homeData.tasks} />
              ) : <div className="placeholder-task">
                    No tasks to do...
                    <img className="placeholder-task-image" src={follow}/>
                  </div>}
            </div>
            <div className="row-2">
              {pokemon && (
                <img
                  src={pokemon.sprites.front_default}
                  alt="pokemon"
                  className={`pokemon-image ${isShaking ? "pokemon-shake" : ""}`}
                  onClick={handlePokemonClick}
                />
              )}
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
