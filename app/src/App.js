
import {
  useLazyQuery,
  gql
} from "@apollo/client";
import { useState } from "react";
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { CircularProgress } from '@mui/material';
import JSONPretty from 'react-json-pretty';
import Typography from '@mui/material/Typography';

const POKEMON_INFO = gql`
query Pokemon($pokemonName: String!){
  pokemon(name: $pokemonName) {
    __typename
    ... on Pokemon {
      id
      name
      height
      weight
    }
    ... on InvalidPokemon {
      errorMsg
    }
  }
}
`
const useStyles = makeStyles({
  center: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: "80vh"
  },

  root: {
    display: "flex",
    flexDirection: "column",
    width: "400px",
    justifySelf: "center",
    justifyContent: "space-around",
    height: "30vh",
  },
});

function App() {
  const classes = useStyles();
  const [pokemonName, setPokemonName] = useState("");
  const [fetch, { loading, data }] = useLazyQuery(POKEMON_INFO);

  return (
    <div className={classes.center}>
      <div className={classes.root}>
        <Typography variant = "h3">Pokemon Search</Typography>
        <TextField placeholder='Search...' onChange={(e) =>  setPokemonName(e.target.value)} />
        <Button variant="contained" onClick={() => fetch({ variables: { pokemonName } } )}>Search pokemon</Button>
      </div>
      {loading ? <CircularProgress/> : <JSONPretty id="json-pretty" data={data}></JSONPretty>} 
    </div>
  );
}

export default App;
