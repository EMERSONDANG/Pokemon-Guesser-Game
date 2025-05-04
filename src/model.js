// model that interacts with PokemonQuiz and PokemonHistory component

let teamHistory = [];

export function addToHistory(pokemonTeamArray) {
    teamHistory.push(pokemonTeamArray);
}

export function getTeamHistory() {
    return teamHistory;
}