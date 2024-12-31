import { useState } from 'react'
import './App.css'


function App() {
  const API_url = "https://pokeapi.co/api/v2/pokemon"
  const [data,setData] = useState(null)
  const [color,setColor]= useState("white")
 
  async function fetchData() {
    const input = document.getElementById("input").value;
    document.getElementById("input").value = ""; // Clear the input field

    try {
      const response = await fetch(`${API_url}/${input.toLowerCase()}`);
      if (!response.ok) {
        throw new Error("Pokemon not found");
      }
      const pokeData = await response.json()
      setData(pokeData);

      
      
    
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setData(null)
    }

    
  } 

  
  
  return (
    
    
    <>
    <div className="box">
      <div className="input">
        <input type='text' placeholder='enter name or id of pokemon' 
        id = "input"></input>
        <button onClick={fetchData}>Submit</button>
      </div>
    

    <div className="container">
        {data ? (
          <>
            <div className="pokeImage">
              <img src={data.sprites.front_default} alt={data.name} />
            </div>
            <div className="pokeName">
              <h2>{(data.name).toUpperCase()}</h2>
            </div>
            <div className="pokeType">
              Type(s):
              {data.types.map((type) => {
                // Define color mapping for each type
                const typeColors = {
                  fire: 'orange',
                  water: 'royalBlue',
                  grass: 'green',
                  poison: 'purple',
                  ice: 'lightBlue',
                  ground: 'brown',
                  normal: '#e3c1aa',
                  psychic: 'pink',
                  fairy: '#f578d6',
                  bug: '#61bf0a',
                  electric: 'yellow',
                  fighting: 'red',
                  rock: '#a38c21',
                  ghost: '#7b62a3',
                  dragon: '#7038f8',
                  dark: '#705848',
                  steel: '#b8b8d0',
                  flying: '#a890f0',
                };

                // Get the background color for the current type
                const bgColor = typeColors[type.type.name] || 'white';

                return (
                  <p
                    key={type.type.name}
                    className="types"
                    style={{
                      backgroundColor: bgColor,
                      color: 'white', // For visibility
                      padding: '5px',
                      borderRadius: '5px',
                    }}
                  >
                    {type.type.name}
                  </p>
                );
              })}
            </div>
          </>
        ) : (
          <p>No Pokemon data to display</p>
        )}
      </div>
    </div>
    
   
    </>
  );
}
export default App
