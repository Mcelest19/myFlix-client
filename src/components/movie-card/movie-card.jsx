import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  console.log("user", user);
    // .find method checks if there is a movie in the users Favorite Movies array by id
    const alreadyFavorite = user.FavoriteMovies.find(id => id === movie.id);

    // useState checks the returned value of alreadyFavorite, if a value is returned "true", if not "false"
    //console.log ("Favorite ?", alreadyFavorite);
    const [favorite, setFavorite] = useState(alreadyFavorite? true : false);
  
    //console.log(favorite);
    const toggleFavorite = () => {
      // if token is undefined/empty, the return statement stops the execution of the function
      if (!token) return;
  
      const url = `https://movie-api-gas8.onrender.com/users/${user.UserName}/movies/${movie.id}`;
      let requestOptions = {
        method: '',
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      if (alreadyFavorite) {
        requestOptions.method = 'DELETE';
        alert("Movie deleted from favorites!");
        setFavorite (false);
      } else {
        requestOptions.method = 'POST';
        alert("Movie added to favorites!");
        setFavorite (true);
      }
  
      // return data
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          //setFavorite = (!alreadyFavorite);
          //console.log ("data", data);
          //console.log("user post favorite clic", user);
          localStorage.setItem('user', JSON.stringify(data)); // sets new movie data to the user's local storage
          //window.location.reload(false);
        })
        .catch((e) => {
          alert('Something went wrong');
        });  
    };   
    
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.genre}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>        
      </Card.Body>
      {favorite ? (
          <Button variant="danger" size="sm" className="remove-fav-button"  onClick={() => toggleFavorite()}> Remove from favorites</Button>) : (
          <Button variant="success" size="sm" className="remove-fav-button" onClick={() => toggleFavorite()}> Add to favorites</Button>)
          }
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string
  }).isRequired
  
};