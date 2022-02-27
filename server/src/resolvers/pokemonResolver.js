import { fetchPokemon } from '../actions/PokemonActions.js';
import { REQUIRED_POKEMON_ATTRIBUTES } from "../utils/Constants.js";
import _ from 'lodash';

export const pokemonResolver = async (root ,args) => {
    const pokemonInfo = await fetchPokemon(args.name);
    if(!pokemonInfo) {
        return { errorMsg: `${args.name} is not a valid pokemon`};
    } else {
        return _.pick(pokemonInfo, ...REQUIRED_POKEMON_ATTRIBUTES);
    }
}