import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar} from "../navigation-bar/navigation-bar";
import { ProfileView} from "../profile-view/profile-view";

import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {  
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      storedUser = JSON.parse(storedUser);
  } catch (e) {}
  }; 
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);  
  const [viewMovies, setViewMovies] = useState(movies);
  

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

  useEffect(() => {
    setViewMovies(movies);
}, [movies]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        onSearch={(query) => {
          setViewMovies(movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase())));
      }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route 
            path= "/signup"
            element={
              <>
              {user ? (
                <Navigate to="/" />
              ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
              )}
              </>
            }
          />
          <Route 
            path= "/login"
            element={
              <>
              {user ? (
                <Navigate to="/" />
              ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
              )}
              </>
            }
          />          
          <Route 
            path= "/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} user={user} token={token} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <ProfileView user={user} movies={movies} token={token} />
              )
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {viewMovies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} user={user} token={token} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
