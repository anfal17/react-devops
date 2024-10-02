import { useState } from "react";
import PokemonList from "../PokemonList/PokemonList";
import PokemonDetails from "../PokemonDetails/PokemonDetails";
import Search from "../Search/Search";
import "./Pokedex.css";

function Pokedex() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="pokedex-wrapper">
      <Search updateSearchTerm={setSearchTerm} />
      {searchTerm === "" ? <PokemonList /> : <PokemonDetails pokemonName={searchTerm} key = {searchTerm}/>}
    </div>
  );
}

export default Pokedex;
