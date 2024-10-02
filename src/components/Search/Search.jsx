import "./Search.css";
import useDebounce from "../../hooks/useDebounce";

function Search({updateSearchTerm}) {
  const debouncedCallback = useDebounce((e)=>updateSearchTerm(e.target.value),2000)
  return (
    <div className="search-wrapper">
      <input
        type="text"
        id="pokemon-name-search"
        placeholder="pokemon name..."
        onChange={debouncedCallback}
      />
    </div>
  );
}

export default Search;
