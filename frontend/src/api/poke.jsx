const getPokemon = async (name) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        return null;
    }
};

const getAllPokemon = async (name) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=2000`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching pokemons", error);
        return null;
    }
}

export { getPokemon, getAllPokemon} 