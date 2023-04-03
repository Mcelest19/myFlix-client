import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Titanic",
      image:
        "https://i.pinimg.com/originals/ca/e5/7c/cae57c80c8607a8e0ab669065889c462.jpg",
      director: "James Francis Cameron"
    },
    {
      id: 2,
      title: "Hook",
      image:
        "https://th.bing.com/th/id/OIP._7vhhNo6do3N94ein8I2AgHaLH?pid=ImgDet&rs=1",
      director: "Steven Spielberg"
    },
    {
      id: 3,
      title: "Taxi Driver",
      image:
        "https://th.bing.com/th/id/OIP.5s36F3wxuK3wEPOIqW6aDgHaLH?pid=ImgDet&rs=1",
      director: "Martin Scorsese"
    },   
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

