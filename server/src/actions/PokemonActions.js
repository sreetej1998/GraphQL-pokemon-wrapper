import { POKEMON_BASE_URL } from "../utils/Urls.js";
import fetch from 'node-fetch';
import _ from "lodash";

export const fetchPokemon = async (name) => {
    const response = await fetch(`${POKEMON_BASE_URL}/${name}`);
    if(response.status!=200) {
        return undefined;
    }
    const pokemons = await response.json();
    return pokemons;
}