import { useContext, useState, useEffect, useRef } from "react";
import NavBar from "../../components/NavBar";
import "./Home.css";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router";
import Popup from "../../components/Popup";
import StatsTextBox from "../../components/StatsTextBox/StatsTextBox";
import CompletedTaskSummary from "../../components/CompletedTaskSummary/CompletedTaskSummary";
import CreateTask from "../CreateTask/CreateTask";
import Settings from "../Settings/Settings";
import Loading from "../../components/Loading";
import TeamDetail from "../../components/TeamDetail/TeamDetail";
import { getPokemon } from "../../api/poke";
import extractStatsFromHomeData from "./extractStatsFromHomeData";
import follow from "../../assets/follow.gif";
import { motion } from "motion/react";
import HomeTasks from "./HomeTasks";
import ViewTask from "../ViewTask/ViewTask";
import MusicPlayer from "../../components/MusicPlayer";
import { HomeContext } from "../../context/HomeContext";
import TaskProvider from "../../context/TaskProvider";

function Home() {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
  const { homeData } = useContext(HomeContext);

  const [clicked, setClicked] = useState("home");
  const [pokemon, setPokemon] = useState(null);
  const [isShaking, setIsShaking] = useState(false);

  // useRef to avoid reinstantiating pokemon audio every rerender
  const soundRef = useRef(null);

  // bounds the draggable area of the pokemon to this ref
  const constraintsRef = useRef(null);

  const handlePokemonClick = () => {
    if (isShaking) {
      return;
    }
    soundRef.current.play();
    setIsShaking(true);

    // Stop shaking after animation is done and 600msecs have elapsed (prevent spam)
    setTimeout(() => setIsShaking(false), 1200);
  };

  useEffect(() => {
    // if the user doesn't exist or they dont have a team, redirect them to signup
    if (!loading && !user?.team_id) {
      navigate("/team-selection");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    (async () => {
      const name = homeData?.team?.team?.pokemon_name;
      if (homeData) {
        const pokeData = await getPokemon(name);
        setPokemon(pokeData);
        soundRef.current = new Audio(
          `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokeData.id}.ogg`
        );
        soundRef.current.volume = 0.3;
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

  const statObj = extractStatsFromHomeData(homeData);
  const teamData = homeData?.team?.team;

  return (
    <>
      <NavBar clicked={clicked} setClicked={setClicked} />

      <main className="home-page">
        {clicked === "home" ? (
          <>
            <div className="row-1">
              {/* Modify below later on to handle not just completed tasks but approval, overdue*/}
              <CompletedTaskSummary fields={temporary_completed_tasks} />
              {statObj && <StatsTextBox stats={statObj} />}
              {homeData?.tasks?.length > 0 ? (
                <HomeTasks tasks={homeData.tasks} />
              ) : (
                <div className="placeholder-task">
                  No tasks to do...
                  <img className="placeholder-task-image" src={follow} />
                </div>
              )}
            </div>
            <div className="row-2">
              {clicked === "home" && <MusicPlayer />}
              {clicked === "home" && teamData && (
                <TeamDetail user={user} teamData={teamData} />
              )}
              {pokemon && (
                <div className="pokemon-container" ref={constraintsRef}>
                  <motion.img
                    src={pokemon.sprites.front_default}
                    alt="pokemon"
                    className={`pokemon-image ${
                      isShaking ? "pokemon-shake" : ""
                    }`}
                    onClick={handlePokemonClick}
                    drag
                    dragConstraints={constraintsRef}
                    dragElastics={0}
                    dragSnapToOrigin={true}
                    transition={{
                      type: "spring",
                      bounce: 100,
                      mass: 500,
                      stiffness: 20,
                      damping: 20,
                      velocity: 0.25,
                    }}
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="pop-up">
            <Popup active={true}>
              {clicked === "newTask" && <CreateTask />}
              {clicked === "profile" && <Settings />}
              {clicked === "viewTask" && (
                <TaskProvider>
                  <ViewTask title="My Tasks" />
                </TaskProvider>
              )}
            </Popup>
          </div>
        )}
      </main>
    </>
  );
}

export default Home;
