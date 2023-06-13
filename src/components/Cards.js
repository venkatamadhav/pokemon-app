import React from 'react'
import { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cards = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageno, setPageno] = useState(0);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");
  const [searchResults , setSearchResults] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const offset = pageno * 20;
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`);
        const data = await res.json();
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
    fetchData();
  }, [pageno]);
  const previous=()=>{
    setPageno(prevpage=>{return prevpage-1})
  }
  const next=()=>{
    setPageno(prevpage=>{return prevpage+1})
  }
  const filterchange = (e) => {
    // const filtervalue = e.target.value.toLowerCase();
    // setFilter(filtervalue)
    setFilter(e.target.value.toLowerCase());
  }
  const inputchange = (e) => {
    const inputvalue = e.target.value.toLowerCase();
    setInput(inputvalue)
  }
  useEffect(() => {
    if (pokemonData) {
      const filteredResults = pokemonData.filter((pokemon) => {
        if (filter === 'All') {
          return (
            pokemon.name.toLowerCase().includes(input) ||
            pokemon.id.toString().includes(input)
          );
        } else {
          return (
            (pokemon.name.toLowerCase().includes(input) || pokemon.id.toString().includes(input)) &&
            pokemon.types.some((type) => type.type.name.toLowerCase() === filter)
          );
        }
      });
      setSearchResults(filteredResults);
    }
  }, [pokemonData, input, filter]);
  document.title = `Pokemon`;
  return (
    <>
      <div className='flex justify-center pt-4'>
        <input type="text" className='mx-8 w-full sm:w-3/4 bg-gray-100 px-6 py-2 rounded border border-pokemon-yellow outline-none' placeholder='Search' onChange={inputchange} value={input}/>
      </div>
      <div className="flex px-8 sm:px-16 py-4 items-center">
        <label htmlFor="types" className="block mr-6 font-medium text-gray-900 text-lg sm:text-2xl">Type</label>
        <select name="types" id="types" defaultValue={"All"} onChange={filterchange} value={filter} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 sm:p-2.5">
            <option value="All" >All</option>
            <option value="Normal">Normal</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Electric">Electric</option>
            <option value="Grass">Grass</option>
            <option value="Ice">Ice</option>
            <option value="Fighting">Fighting</option>
            <option value="Poison">Poison</option>
            <option value="Ground">Ground</option>
            <option value="Flying">Flying</option>
            <option value="Psychic">Psychic</option>
            <option value="Bug">Bug</option>
            <option value="Rock">Rock</option>
            <option value="Ghost">Ghost</option>
            <option value="Dragon">Dragon</option>
            <option value="Dark">Dark</option>
            <option value="Steel">Steel</option>
            <option value="Fairy">Fairy</option>
        </select>
      </div>
      <div className='flex flex-wrap justify-center mx-auto'>
          {loading ? (
              <h3>Loading...</h3>
              ) : searchResults.length > 0 ? ( 
              searchResults.map((pokemon) => {
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
                  <Link to={`/pokemon/${pokemon.id}`}>
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
                    </Link>
                </div>
              )
              })
            )
            :(
            <h3>No results found.</h3>
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