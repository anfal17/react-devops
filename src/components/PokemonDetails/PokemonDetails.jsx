import { useParams, Link } from "react-router-dom";
import "./PokemonDetails.css";
import usePokemonDetails from "../../hooks/usePokemonDetails";
import loadingimg from "../../assets/images/loading.jpg";

function PokemonDetails({pokemonName}) {
  const { id } = useParams();
  const { pokemon, isLoading, pokemonListState } = usePokemonDetails(id, pokemonName);

  if (isLoading) {
    return (
      <div className="loading">
        <img src={loadingimg} />
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="pokemon-details-wrapper">
        <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />

        <div className="pokemon-name">
          Name: <span>{pokemon.name}</span>
        </div>
        <div>
          Height: <span>{pokemon.height}</span>
        </div>
        <div>
          Weight: <span>{pokemon.weight}</span>
        </div>
        <div className="pokemon-details-types">
          {pokemon.types.map((type) => (
            <div key={type}>{type}</div>
          ))}
        </div>

        {pokemon.types && pokemon.similarPokemons && (
          <div>
            more {pokemon.types[0]} type pokemons
            <ul>
              {pokemon.similarPokemons.map((p) => (
                <li key={p.pokemon.url}>
                  <Link to={`/pokemon/${p.pokemon.name}`}>
                    {p.pokemon.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default PokemonDetails;
