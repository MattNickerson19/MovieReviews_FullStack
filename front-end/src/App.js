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
  }, []);
  
  
  return (
    <Container className=" bd-dark">
    <Routes>
      <Route path="/" element= {<MovieList movies={movies} onRemoveMovie= {name => {
        const newMovies = movies.filter(movie => movie.name !== name);
        setMovies(newMovies);
        const data = {name: name};
        fetch('/api/removeMovie', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json",}
          })
          
      }}/>} />
      <Route path="/api/addMovie" element= {<AddMovieForm onNewMovie= {(name, date, formatedActors, rating, poster)=> {
        const newMovie = {
          "name": name,
          "date": date,
          "actors": formatedActors,
          "rating": rating,
          "poster": poster
        };
        movies.push(newMovie);
        setMovies(movies);

        fetch('/api/addMovie', {
          method: 'post',
          body: JSON.stringify(newMovie),
          headers: {"Content-Type": "application/json",}
        })
      }}/>}/>
      <Route path="*" element= {<ErrorPage/>} />
    </Routes>
    </Container>
    
  );
}

export default App;

