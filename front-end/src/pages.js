import React, { useState } from "react";
import './App.css';
import {Link} from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import Nav from "react-bootstrap/Nav";

export function MovieList({movies = [], onRemoveMovie = f => f}){
    return (
        <Container className="bg-dark" style={{height: "100rem"}}>
            <Header />
            <Container>
                <Row>
                    
            {movies.map( (movie )=> {
                return <Col>
                <Movie key={movie.name} {...movie} onRemove={onRemoveMovie}></Movie>
                </Col>
            })}
            </Row>
            </Container>
        </Container>
    );
}

function Movie({name, date, actors=[], rating, poster, onRemove = f => f}){

    return (
        <div className= "bg-dark text-light">
            <Card className="m-3"style={{ width: '20rem' }}>
                <Card.Img style ={{ height: "25rem" }} variant="top" src={poster} />
                <Card.Body style ={{ height: "20rem" }} className="bg-dark">
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                    Date: {date} <br></br>
                    Actors:
                        <ul>
                            {actors.map((actor, i) => {
                            return <li key={i}>{actor}</li>
                        })}
                        </ul>
                    Rating: {rating}
                    </Card.Text>
                    <Button variant="outline-light" onClick={ () => onRemove(name)}>Remove</Button>
                </Card.Body>
            </Card>
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
        <Navbar bg="dark">
            <Container>
                <NavbarBrand className="text-light text-lg">Movie Reviews</NavbarBrand>
            <Nav className="text-light">
            <Link className="p-2 text-light nav-link" to="/">View Movie Reviews</Link>
            <Link className="p-2 text-light nav-link" to="add">Add Movie Reviews</Link>
            </Nav> 
            </Container>
        </Navbar>
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
          <div className="bg-dark">
            <Header />
            <Container style={{height: "50rem"}}>
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
            <button className="btn btn-outline-light">Submit</button>
            </form>
            </Container>
          </div>
          
      )
  }