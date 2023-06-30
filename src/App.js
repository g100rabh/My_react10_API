import React, { useCallback, useEffect, useRef, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import NewMovieForm from "./components/NewMovieForm";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [isClicked, setIsClicked] = useState(false);
  const [error, setError] = useState(null);
  const isCancelled = useRef(false);
  const [visibleButton, setVisibleBtn] = useState();

  const fetchMoviesHandler = useCallback(async () => {
    console.log(isCancelled);
    if (isCancelled.current) {
      setError("Please try again late.");
      return;
    }
    console.log("s");
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films");

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

      if (!isCancelled.current) {
        setVisibleBtn(true);
        setTimeout(() => {
          fetchMoviesHandler();
        }, 5000);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const cancelRetryHandler = (event) => {
    console.log(isCancelled);
    isCancelled.current = true;
    setVisibleBtn(false);
  };

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

  return (
    <React.Fragment>
      <section>
        <NewMovieForm />
      </section>

      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {visibleButton && (
          <button onClick={cancelRetryHandler}>Cancel Retry</button>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
