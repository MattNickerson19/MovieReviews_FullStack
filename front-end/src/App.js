import './App.css';
import { Routes, Route } from "react-router-dom";
import { MovieList, ErrorPage, AddMovieForm } from "./pages";
import { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container"



function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch('/api/movies')
      .then((response) => response.json())
      .then(setMovies)
  }, [movies]);
  
  
  return (
    <Routes>
      <Route path="/" element= {<MovieList movies={movies} onRemoveMovie= {name => {
        const newMovies = movies.filter(movie => movie.name !== name);
        setMovies(newMovies);
      }}/>} />
      <Route path="/add" element= {<AddMovieForm onNewMovie= {(name, date, formatedActors, rating, poster)=> {
        const newMovie = {
          "name": name,
          "date": date,
          "actors": formatedActors,
          "rating": rating,
          "poster": poster
        };
        movies.push(newMovie);
        setMovies(movies);
        console.log(movies);
      }}/>}/>
      <Route path="*" element= {<ErrorPage/>} />
    </Routes>
    
  );
}

export default App;

