import { ApolloServer } from 'apollo-server';
import { pokemonResolver } from './resolvers/pokemonResolver.js';

const typeDefs = `
  type Query {
    pokemon( name: String!): PokemonResponse
  }

  type Pokemon {
    id: String!
    name: String!
    weight: Float!
    height: Float!
  }

  type InvalidPokemon {
    errorMsg: String!
  }

  union PokemonResponse = Pokemon | InvalidPokemon
`
const resolvers = {
  Query: {
    pokemon: pokemonResolver
  },
  PokemonResponse: {
    __resolveType(obj, context, info) {
      return obj.errorMsg ? 'InvalidPokemon': 'Pokemon'; 
    }
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );