import axios from "axios";
import { useEffect, useState } from "react";
import usePokemonList from "./usePokemonList";

function usePokemonDetails(id , pokemonName) {
  const [pokemon, setPokemon] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { pokemonListState, setPokemonListState } = usePokemonList();

  async function fetchPokemon() {

    let response;
    if(pokemonName){
      response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    }else{
      response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    }

    // const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    const pokemonOfSameTypes = await axios.get(
      `https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name : ''}`
    );

    const similarPokemons = pokemonOfSameTypes.data.pokemon.slice(0, 10);

    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name),
      similarPokemons: similarPokemons,
    });

    setPokemonListState({
      ...pokemonListState,
      type: response.data.types ? response.data.types[0].type.name : '',
    });

    setIsLoading(false);
  }

  useEffect(() => {
    fetchPokemon();
  }, [id , pokemonName]);

  return { pokemon, isLoading, pokemonListState };
}

export default usePokemonDetails;
