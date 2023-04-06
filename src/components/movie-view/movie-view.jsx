export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>     
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <span>Genre: </span>
          <span>{movie.genre}</span>
        <div>
          <span>Director: </span>
          <span>{movie.director}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };
  