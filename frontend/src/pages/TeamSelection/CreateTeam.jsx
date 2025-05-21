import { useContext, useState } from "react";
import InputBox from "../../components/InputBox";
import { useNavigate } from "react-router-dom";
import { createTeam } from "../../api/teams";
import "../../components/InputBox.css";
import "./Team.css";
import { AuthContext } from "../../context/authContext";
import Popup from "../../components/Popup";
import PokemonMenu from "./PokemonMenu";
import upperCase from "../../utils/upperCase";
PokemonMenu

function CreateTeam({ setActive }) {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [pokeMenuOpen, setPokeMenuOpen] = useState(false)
  const { user, refetchUser } = useContext(AuthContext);


  const onSubmit = async (data) => {
    const resData = await createTeam(
      data.teamName,
      data.classCode,
      data.assignment,
      pokemon
    );
    console.log(resData);
    if (resData.success) {
      // Navigate to the main dashboard or something
      await refetchUser();
      console.log(user);
      navigate("/");
    } else {
      setErrorMsg(resData.message || "Something went wrong, please try again");
    }
  };

  return (
    <>
      <div className="background-mask" onClick={() => setActive(false)}>
        {/*Prevent popup from closing when you click the input box*/}
        <div className="create input-box" onClick={(e) => e.stopPropagation()}>
          Create Team
          <button className="choose-pokemon-menu-btn" onClick={() => setPokeMenuOpen(true)}>
            Choose your pokemon!
          </button>
          {pokemon && <input type="text" value={upperCase(pokemon)} disabled placeholder="Select above" className="pokemon-txt-display"/>}
          <InputBox
            fields={[
              { name: "New Team Name", value: "teamName"},
              { name: "Class Code (e.g. COMP1511)", value: "classCode", max: 8},
              { name: "Assignment Name", value: "assignment" },
            ]}
            buttonText="Create Team"
            buttonTopText={errorMsg}
            onSubmit={onSubmit}
          />
        </div>
            <div className="pop-up">
            <Popup active={pokeMenuOpen}>
                <PokemonMenu pokemon={pokemon} setPokemon={setPokemon} setActive={setPokeMenuOpen}/>
            </Popup>
          </div>
      </div>
    </>
  );
}

export default CreateTeam;
