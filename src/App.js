import './App.css';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import PokemonDetails from './components/PokemonDetails';



function App() {
  
  
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </div>
  );
}

export default App;
