import React from "react";
import classes from './NewMovieForm.module.css';

const NewMovieForm = props => {

    const clickHandler = (event) => {
        event.preventDefault();
        const t = document.getElementById("title").value;
        const ot = document.getElementById("openingtext").value;
        const rd = document.getElementById("date").value;

        console.log({Title: t, OpeningText: ot, ReleaseDate: rd});
    }

    return (
        <form className={classes.form}>
            <label htmlFor="title" >Title</label>
            <input type="text" id="title" />
            <label htmlFor="openingtext" >Opening text</label>
            <textarea id="openingtext" />
            <label htmlFor="date">Release Date</label>
            <input type="date" id="date" />
            <button onClick={clickHandler}>Add movie</button>
        </form>
    )
};

export default NewMovieForm