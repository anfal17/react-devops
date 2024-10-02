import axios from "axios";
import { useState, useEffect } from "react";

function usePokemonList() {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexurl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });

  async function downloadPokemons() {
    // setIsLoading(true)

      
      setPokemonListState((state) => ({ ...state, isLoading: true }));

      const response = await axios.get(pokemonListState.pokedexurl); // This downloads a list of 20 pokemons

      const pokemonResults = response.data.results; // We get the array of pokemons from result

      // setNextUrl(response.data.next);
      // setPrevUrl(response.data.previous);
      setPokemonListState((state) => ({
        ...state,
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
      }));

      // Iterating over the array of pokemons, and using their URL, to create an array of promises
      // This will download those 20 pokemons

      const pokemonResultPromise = pokemonResults.map((pokemon) =>
        axios.get(pokemon.url)
      );

      const pokemonData = await Promise.all(pokemonResultPromise); // Array of 20 pokemon details

      // Iterating on the data of each pokemon to get its details
      const pokeListResult = pokemonData.map((pokeData) => {
        const pokemon = pokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
          types: pokemon.types,
        };
      });

      // console.log(pokeListResult);
      // setPokemonList(pokeListResult);
      // setIsLoading(false);

      setPokemonListState((state) => ({
        ...state,
        pokemonList: pokeListResult,
        isLoading: false,
      }));
    
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexurl]);

  return { pokemonListState, setPokemonListState };
}

export default usePokemonList;
