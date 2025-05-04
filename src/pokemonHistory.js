import "./pokemonHistory.css";
import { getTeamHistory } from "./model.js";

export default function PokemonHistory({ onClose }) {
    const history = getTeamHistory();

    return (
        <div className="blur">
            <button className="history-x" onClick={onClose}>X</button>
            <h2> Past Teams </h2>

            <div className="pokemon-container">
                {history.map((team, teamIndex) => {
                    return (
                        <div className="pokemon-box">
                            <h3> Team {teamIndex + 1} </h3>

                            <div className="pokemon-grid">
                                {team.map((poke, pokeIndex) => {
                                    return(
                                    <div className="pokemon-info" key={pokeIndex}>
                                        <img
                                            src={poke.sprites.front_default}
                                            alt={poke.name}
                                            width={80}
                                            height={80}
                                        ></img>

                                        <p> {poke.name} </p>
                                    </div>
                                    )
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    ); 
}