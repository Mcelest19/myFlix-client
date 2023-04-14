import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

import { Row, Col } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return;    

    fetch("https://movie-api-gas8.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        const MoviesFromApi = data.map((movie) => {
          const obj = {
            id: movie._id,
            title: movie.Title,
            director: movie.Director.Name,
            genre: movie.Genre.Name,
            description: movie.Description,
            image: movie.Image,
            year_release: movie.Year_release
          };
          return obj;
        });
        setMovies(MoviesFromApi);
      });
  }, [token]);

  return (
    <Row className="justify-content-md-center"> 
      {!user ? (        
        <Col md={5}>
          <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }} />
          or
          <SignupView />
        </Col>        
      ) : selectedMovie ? (        
        <Col md={8} >
          <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </button>
          <MovieView
            style={{ border: "1px solid green" }}
            movie={selectedMovie} 
            onBackClick={() => setSelectedMovie(null)} 
        />
        </Col>
      ) : movies.length === 0 ? (
        <>
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </button>
        <div>The list is empty!</div>
      </>
      ) : (
        <>
          <button
            onClick={() => {
            setUser(null);
          }}
          >
          Logout
          </button>
          {movies.map((movie) => (
            <Col className="mb-5" key={movie.id} md={3}>
              <MovieCard                
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
              }}
            />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};
