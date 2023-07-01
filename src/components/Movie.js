import React from "react";

import classes from "./Movie.module.css";


const deleteMovieHandler = async event => {
  const dlt = event.target.parentElement;
  try{
    const response = await fetch(
      `https://myreact-movie-default-rtdb.firebaseio.com/movies/${dlt.id}.json`,
      {
        method: "DELETE",
      }
    );
    if(!response.ok){
      throw new Error('Movie already deleted')
    }
    
  } catch(error){
    console.log(error.message);
  }
  dlt.remove();
}

const Movie = (props) => {
  return (
    <li className={classes.movie} id={props.id}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button type="delete" onClick={deleteMovieHandler} >Delete</button>
    </li>
  );
};

export default Movie;
