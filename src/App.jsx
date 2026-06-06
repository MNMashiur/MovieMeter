import './CSS/App.css';
import Home from './Pages/Home'
import Favorites from './Pages/Favorites'
import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './Context/MovieContext';
import NavBar from './Components/NavBar';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import MovieDetails from "./Pages/MovieDetails";


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/movie/:id"element={<MovieDetails />}/>
        </Routes>
    </>
  );
}

export default App;