import React from 'react'
import { useEffect , useState } from 'react';
import { useParams } from 'react-router-dom';
const PokemonDetails = () => {
  const { id } = useParams();
// console.log(id);
const [pokeData, setPokeData] = useState(null);
const fetchData = async () => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    // const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await res.json();
    setPokeData(data);
    
     } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchData();
  
}, [id]);
const styles = {
  normal: '#A8A77A',
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
  };
document.title = `${pokeData?.name || "Loading..."}`;
console.log(pokeData);
  return (
    <div className='min-h-screen pt-8 bg-gray-300 flex flex-wrap sm:flex-nowrap justify-center mx-auto'>
       { pokeData ? 
       ( 
        <>
          <div className='flex-1'>
            <img 
            src={pokeData.sprites.other.dream_world.front_default || pokeData.sprites.other.home.front_default || pokeData.sprites.other["official-artwork"].front_default || pokeData.sprites.front_shiny} 
            alt={pokeData.name}  />
          </div>
          <div className='flex-1'>
            <p className='text-4xl font-semibold'>
              <span>#{pokeData.id}.</span>
              <span className='capitalize'>{pokeData.name}</span>
            </p>
            <p>
              <span>Height: &nbsp;</span>
              <span>{pokeData.height}</span>
            </p>
            <p>
              <span>Weight: &nbsp;</span>
              <span>{pokeData.weight}</span>
            </p>
            <div className='flex justify-center'>
                <p className='text-white text-2xl font-semibold mr-2 px-4 rounded capitalize' style={{backgroundColor:styles[pokeData.types[0].type.name]}}>{pokeData.types[0].type.name}</p>
                {pokeData.types.length > 1 && <p className='text-white text-2xl font-semibold mr-2 px-4 rounded capitalize' style={{backgroundColor:styles[pokeData.types[1].type.name]}}>{pokeData.types[1].type.name}</p>}
            </div>
            <div>
              <div className="flex justify-between">
                  <span>HP</span>
                  <span>{pokeData.stats[0].base_stat}</span>
                </div>
                <div className="h-4 w-full bg-gray-900 rounded-full">
                  <div className="h-4 rounded-full" style={{backgroundColor:"#da4343", width:parseInt(pokeData.stats[0].base_stat)*2.55}}></div>
                </div>
            </div>
            <div>
              <div className="flex justify-between">
                    <span>ATTACK</span>
                    <span>{pokeData.stats[1].base_stat}</span>
              </div>
              <div className="h-4 w-full bg-gray-900 rounded-full">
                    <div className="h-4 rounded-full" style={{backgroundColor:"#f38d45", width:parseInt(pokeData.stats[1].base_stat)*1.81}}></div>
              </div>
            </div>
            <div>
              <div>
                <div className="flex justify-between">
                      <span>DEFENCE</span>
                      <span>{pokeData.stats[2].base_stat}</span>
                </div>
                <div className="h-4 w-full bg-gray-900 rounded-full">
                      <div className="h-4 rounded-full" style={{backgroundColor:"#f3d14a", width:parseInt(pokeData.stats[2].base_stat)*2.3}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                      <span>SPECIAL-ATTACK</span>
                      <span>{pokeData.stats[3].base_stat}</span>
                </div>
                <div className="h-4 w-full bg-gray-900 rounded-full">
                      <div className="h-4 rounded-full" style={{backgroundColor:"#547fe4", width:parseInt(pokeData.stats[3].base_stat)*1.73}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                      <span>SPECIAL-DEFENCE</span>
                      <span>{pokeData.stats[4].base_stat}</span>
                </div>
                <div className="h-4 w-full bg-gray-900 rounded-full">
                      <div className="h-4 rounded-full" style={{backgroundColor:"#84df57", width:parseInt(pokeData.stats[4].base_stat)*2.3}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                      <span>SPEED</span>
                      <span>{pokeData.stats[5].base_stat}</span>
                </div>
                <div className="h-4 w-full bg-gray-900 rounded-full">
                      <div className="h-4 rounded-full" style={{backgroundColor:"#f75887", width:parseInt(pokeData.stats[5].base_stat)*2.0}}></div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
};

export default PokemonDetails