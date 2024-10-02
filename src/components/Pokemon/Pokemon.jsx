import { Link } from "react-router-dom";
import "./Pokemon.css";

function Pokemon({ name, image , id}) {
  console.log(id)

  return (
    <div className="pokemon">
      <Link key={id} to= {`/pokemon/${id}`}>
      <div className="pokemon-name">
        <p>{name}</p>
        <div>
          <img src={image} alt="" className="pokemon-img" />
        </div>
      </div>
    </Link>
    </div>
  );
}
export default Pokemon;
