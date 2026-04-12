import './CSS/App.css';
import Home from './Pages/Home'
import Favorite from './Pages/Favorites'
import {Routes, Route} from 'react-router-dom'
import { MovieProvider } from './Context/MovieContext'; 
import NavBar from './Components/NavBar';


function App() {

  return (
    <MovieProvider>
    <div>
      <NavBar />
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorite />} />
      </Routes>
    </main>
    </div>
    </MovieProvider>
  );
}

export default App