import React from 'react'
import { useState , useEffect } from 'react';

const Cards = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageno, setPageno] = useState(0);

  
  const fetchData = async (id) => {
    try {
      const offset = pageno * 20;
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`);
      // const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const data = await res.json();
      // setPokemonData(data);
      const pokemonList = data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        return res.json();
      });
      const pokemonData = await Promise.all(pokemonList);
      setPokemonData(pokemonData);
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pageno]);
  const previous=()=>{
    setPageno(prevpage=>{return prevpage-1})
  }
  const next=()=>{
    setPageno(prevpage=>{return prevpage+1})
  }
  
  return (
    <>
      <div className='flex flex-wrap justify-center mx-auto'>
          {loading ? (
              <h3>Loading...</h3>
              ) : ( 
              pokemonData.map((pokemon) => {
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
              return (    
                <div key={pokemon.id} className="card p-4">
                    <div className='bg-gray-200 p-4 rounded'>
                        <img 
                            // src={pokemon.sprites.other.dream_world.front_default} 
                            // src={pokemon.sprites.other.home.front_default} 
                             src={pokemon.sprites.other.dream_world.front_default || pokemon.sprites.other.home.front_default || pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_shiny} 
                            alt={pokemon.name} 
                            className='h-[260px] w-[260px] sm:h-[320px] sm:w-[320px]'
                        />
                        <div className='flex justify-center'>
                            <p className='text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded capitalize' style={{backgroundColor:styles[pokemon.types[0].type.name]}}>{pokemon.types[0].type.name}</p>
                            {pokemon.types.length > 1 && <p className='text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded capitalize' style={{backgroundColor:styles[pokemon.types[1].type.name]}}>{pokemon.types[1].type.name}</p>}
                        </div>
                        <p className='text-center'>
                            <span className='bold text-3xl mr-2'>
                                {`${pokemon.id}.`}
                            </span>
                            <span className='text-3xl capitalize '>{pokemon.name}</span>
                        </p>
                    </div>
                </div>
              )
              })
          )}
      </div>
      <div className='container mx-auto flex flex-wrap justify-between pb-4'>
        <button 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-700' 
          onClick={previous}
          disabled={pageno===0?true:false}
          >Previous</button>
        <button 
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-700' 
        onClick={next}
         disabled={pageno===64?true:false}
        >Next</button>
      </div>
    </>
  )
}

export default Cards