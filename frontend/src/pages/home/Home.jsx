import { useContext, useState, useEffect } from "react";
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
import { getHomePageData } from "../../api/teams";
import { getPokemon } from "../../api/poke";
import extractStatsFromHomeData from "./extractStatsFromHomeData";

function Home() {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const [clicked, setClicked] = useState("home");
  const [homeData, setHomeData] = useState(null);
  const [pokemon, setPokemon] = useState(null);

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

  var temporary_completed_tasks = {
    key: "Will and Kevin just completed a difficult task!",
  };

  const statObj = extractStatsFromHomeData(homeData);

  return (
    <>
      <NavBar clicked={clicked} setClicked={setClicked} />

      <main className="home-page">
        {clicked === "home" ? (
          <>
            <div className="column-1">
              {/* Modify below later on to handle not just completed tasks but approval, overdue*/}
              <CompletedTaskSummary fields={temporary_completed_tasks} />
              {statObj && <StatsTextBox stats={statObj} />}
              {/* Add task todo */}
            </div>
            <div className="column-2">
              {pokemon && (
                <img
                  src={pokemon.sprites.front_default}
                  alt="Eevee"
                  className="pokemon-image"
                />
              )}
            </div>
          </>
        ) : (
          <div className="pop-up">
            <Popup active={true}>
              {clicked === "newTask" && <CreateTask />}
              {clicked === "profile" && <Settings />}
              {clicked === "viewTask" && <ViewTask title="My Tasks" />}
            </Popup>
          </div>
        )}
      </main>
    </>
  );
}

export default Home;
