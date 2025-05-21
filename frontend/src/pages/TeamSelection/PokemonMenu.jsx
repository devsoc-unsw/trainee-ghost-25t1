import { useEffect, useState } from "react";
import { getAllPokemon } from "../../api/poke";
import upperCase from "../../utils/upperCase";
import useDebounce from "../../hooks/useDebounce";
import missingno from "../../assets/missingno.png"
const PokemonMenu = ({ setPokemon, setActive }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    (async () => {
      const res = await getAllPokemon();
      setPokemonList(res);
      setFiltered(res.results.slice(0, 15));
    })();
  }, []);

  // Generaet a link that gets a pokemon image based on an id
  const getLink = (id) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };

  const filterResults = () => {
  const data = pokemonList?.results
    ?.filter((p) => p.name.includes(search.toLowerCase()))
    .filter((_, idx) => idx < 15);
    setFiltered(data);
  }


  useDebounce(filterResults, 300, search)

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Extract the id from an object with name and url
  const extractId = (obj) => {
    const segments = obj.url.split("/");
    return Number(segments[segments.length - 2]);
  };

  const handleClick = (pokemonName) => {
    setPokemon(pokemonName);
    setActive(false)

  }

  return (
    <div className="background-mask" onClick={() => setActive(false)}>
      {/*Prevent popup from closing when you click the input box*/}
      <div
        className="create input-box pokemenu"
        onClick={(e) => e.stopPropagation()}
      >
        Choose your pokemon!
        <input
          value={search}
          onChange={handleSearchChange}
          type="text"
          className="search"
          placeholder="Search..."
        />
        <div className="poke-container">
          {filtered?.length > 0 ? filtered?.map((p) => (
            <div className="pokemon-tile" onClick={() => handleClick(p.name)}>
              <img src={getLink(extractId(p))} />
              <p>{upperCase(p.name)}</p>
            </div>
          )) : (
            <div className="missing-poke-div">
              <p className="nothing-txt">No pokemon found!</p>
              <img src={missingno} alt="" className="missing-no"/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonMenu;
