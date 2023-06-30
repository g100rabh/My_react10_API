import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const cancelRetryHandler = (event) => {
    console.log(isCancelled);
    setIsCancelled(true);
    setRetryCount(0);
  };

  async function fetchMoviesHandler() {
    setIsClicked(true);
    if (!isCancelled) {
      console.log("s");
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("https://swapi.dev/api/film");

        if (!response.ok) {
          throw new Error("Something went wrong...Retrying");
        }
        const data = await response.json();
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
      } catch (error) {
        setError(error.message);
          setRetryCount(retryCount + 1);
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if(retryCount>0){
        fetchMoviesHandler();
      }
    }, 5000);
  }, [retryCount]);

  let content = <p>Found no movies</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (isCancelled && error) {
    content = <p>{error}</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      {isClicked && (
        <section>
          {content}
          {error && !isCancelled && <button onClick={cancelRetryHandler}>Cancel Retry</button>}
        </section>
      )}
    </React.Fragment>
  );
}

export default App;
