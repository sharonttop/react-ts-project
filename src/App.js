import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types"
import './App.css';


const PokemonRow = ({ pokemon, onSelect}) =>(
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(', ')}</td>
    <td>
      <button
        onClick={() => onSelect(pokemon)}
      >Select!</button>
    </td>
  </tr>
)

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onSelect: PropTypes.func
}

//test-branch的內容
const PokemonTest = ({name, base}) =>(
  <div>
  <h1>{name.english}</h1>
  <table>
    {Object.keys(base).map((key) =>(
      <tr key={key}>
        <td>{key}</td>
        <td>{base[key]}</td>
      </tr>
    ))}
  </table>
</div>
)

const PokemonInfo = ({name, base}) =>(
  <div>
  <h1>{name.english}</h1>
  <table>
    {Object.keys(base).map((key) =>(
      <tr key={key}>
        <td>{key}</td>
        <td>{base[key]}</td>
      </tr>
    ))}
  </table>
</div>
)

PokemonInfo.protoTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  })
}
//test-branch的內容
PokemonTest.protoTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number,
    Attack: PropTypes.number,
    Defense: PropTypes.number,
    "Sp. Attack": PropTypes.number,
    "Sp. Defense": PropTypes.number,
    Speed: PropTypes.number,
  })
}

function App() {
  const [filter, filterSet] = useState("");
  const [pokemon, pokemonSet] = useState([]);
  const [selectedItem, selectedItemSet]= useState(null)

  useEffect(() => {
      fetch("http://localhost:3000/react-ts-project/pokemon.json")
        .then(resp=>resp.json())
        .then((data)=> pokemonSet(data))
  }, [])
  

  return (
    <div style={{
      margin: "auto",
      width: 800,
      paddingTop: "1rem",
    }}>
      <h1 className="title">Pokemon Search</h1>
      <div 
        style={{
          display:"grid",
          gridTemplateColumns: "70% 30%",
          gridColumnGap: "1rem",
        }}
      >
        <div>
          <h1>test-branch的內容</h1>
          <input value={filter} onChange={(event) => filterSet(event.target.value)}/>
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
                {pokemon
                  .filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
                  .slice(0, 20).map((pokemon) => (
                  <PokemonRow pokemon={pokemon} key={pokemon.id} onSelect={(pokemon) => selectedItemSet(pokemon) } />
                ))}
            </tbody>
          </table>
        </div>
        {selectedItem && <PokemonInfo {...selectedItem} />}
      </div>
    </div>
  );
}

export default App;
