import "./pokemonHistory.css";
import { rendering } from "./model.js";

export default function PokemonHistory({ onClose }) {
    return (
        <div className="blur">
            <button className="history-x" onClick={onClose}> X </button>
        </div>
    ); 
}