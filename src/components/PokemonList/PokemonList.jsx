import Pokemon from "../Pokemon/Pokemon";
import "./PokemonList.css";

//import image
import loadingImg from "../../assets/images/loading.jpg";
import usePokemonList from "../../hooks/usePokemonList";

function PokemonList() {
  // const [pokemonList, setPokemonList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [pokedexurl, setPokedexurl] = useState(
  //   "https://pokeapi.co/api/v2/pokemon"
  // );

  // const [nextUrl, setNextUrl] = useState("");
  // const [prevUrl, setPrevUrl] = useState("");

 //--------Put in custom Hooks-------
  // const [pokemonListState, setPokemonListState] = useState({
  //   pokemonList: [],
  //   isLoading: true,
  //   pokedexurl: "https://pokeapi.co/api/v2/pokemon",
  //   nextUrl: "",
  //   prevUrl: "",
  // });

  const {pokemonListState, setPokemonListState} = usePokemonList();

  

  return (
    <>
      <div className="pokemon-list-wrapper">
        <div className="pokemon-wrapper">
          {pokemonListState.isLoading ? (
            <img src={loadingImg} />
          ) : (
            pokemonListState.pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))
          )}
        </div>
        <div className="controls">
          <button
            disabled={pokemonListState.prevUrl == null}
            onClick={() => {
              const urlToSet = pokemonListState.prevUrl;
              setPokemonListState({...pokemonListState ,pokedexurl:urlToSet })
            }}
          >
            Prev
          </button>
          <button
            disabled={pokemonListState.nextUrl == null}
            onClick={() => {
              const urlToSet = pokemonListState.nextUrl;
              setPokemonListState({...pokemonListState ,pokedexurl:urlToSet })
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default PokemonList;
