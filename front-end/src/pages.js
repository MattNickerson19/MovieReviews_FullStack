import React, { useState } from "react";
import './App.css';
import { FaTrash } from "react-icons/fa";
import {Link} from "react-router-dom";

export function MovieList({movies = [], onRemoveMovie = f => f}){
    return (
        <div>
            <Header />
            {movies.map( (movie )=> {
                return <Movie key={movie.name} {...movie} onRemove={onRemoveMovie}></Movie>
            })}
        </div>
    );
}

function Movie({name, date, actors=[], rating, poster, onRemove = f => f}){

    return (
        <div className="site">
        <ul>
            <img alt={name} src={poster} height={300}></img>
            <li>
                Name: {name}
            </li>
            <li>
                Date: {date}
            </li>
            <li>
            Actors:
                <ul>
                    {actors.map((actor, i) => {
                    return <li key={i}>{actor}</li>
                })}
                </ul>
            </li>
            <li>
                Rating: {rating}
            </li>
        </ul>
        <button onClick={ () => onRemove(name)}>Remove
            <FaTrash />
        </button>
        </div>
        
    )
}

export function ErrorPage(){
    return (
        <h1>Error Finding Page...</h1>
    )
}
function Header(){
    return(
        <div>
            <h1>Movie Reviews</h1>
            <nav className="link">
            <Link to="/">View Movie Reviews</Link>
                <Link to="add">Add Movie Reviews</Link>
            </nav>   
        </div>
      
    )
  }

  export function AddMovieForm({ onNewMovie = f => f}){
      const [name, setName] = useState("");
      const [date, setDate] = useState("");
      const [actors, setActors] = useState([]);
      const [rating, setRating] = useState("");
      const [poster, setPoster] = useState("");

      const submit = e => {
          e.preventDefault();
          const formatedActors = actors.split(",");

          onNewMovie(name, date, formatedActors, rating, poster);
          setName("");
          setDate("");
          setActors([]);
          setRating("");
          setPoster("");
          
      };

      
      return (
          <div className="container">
            <Header />
            <form onSubmit={submit}>
            <div className="mb-3">
                <label className="form-label">NAME</label>
                <input 
                    value={name}
                    onChange={event => setName(event.target.value)}
                    type="text" className="form-control" required/>
            </div>
            <div className="mb-3">
                <label className="form-label">DATE</label>
                <input 
                    value={date}
                    onChange={event => setDate(event.target.value)}
                    type="text" className="form-control" required/>
            </div>
            <div className="mb-3">
                <label className="form-label">ACTORS</label>
                <input 
                    value={actors}
                    onChange={event => setActors(event.target.value)}
                    type="text" className="form-control" placeholder="use a comma between actors" required/>
            </div>
            <div className="mb-3">
                <label className="form-label">RATING</label>
                <input 
                    value={rating}
                    onChange={event => setRating(event.target.value)}
                    type="text" className="form-control" required/>
            </div>
            <div className="mb-3">
                <label className="form-label">POSTER</label>
                <input 
                    value={poster}
                    onChange={event => setPoster("/images/Pulp_Fiction_(1994)_poster.jpeg")}
                    type="text" className="form-control" required/>
            </div>
            <button className="btn btn-primary">Submit</button>
            </form>
            
          </div>
          
      )
  }