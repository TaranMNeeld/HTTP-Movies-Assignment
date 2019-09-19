import React, { useState, useEffect } from "react";
import axios from "axios";

const initialState = {
    id: Date.now(),
    title: "",
    director: "",
    metascore: 0,
    stars: []
}

const UpdateMovieForm = props => {
    const [movie, setMovie] = useState(initialState);
    const { match, movies } = props;
    useEffect(() => {
        console.log(movies)
        const id = match.params.id;
        console.log("match.params.id", id);
        const movieToUpdate = movies.find(movie => `${movie.id}` === id);
        console.log("movie to update:", movieToUpdate);
        if (movieToUpdate) {
            setMovie(movieToUpdate);
        }
    }, [match, movies])
    return (
        <div>
            <h2>Update Movie</h2>
            <form>
                <input
                    type="text"
                    name="title"
                    placeholder="title"
                    value={movie.title}
                    onChange={({ target }) => setMovie({ ...movie, [target.name]: target.value })}
                />
                <input
                    type="text"
                    name="director"
                    placeholder="director"
                    value={movie.director}
                    onChange={({ target }) => setMovie({ ...movie, [target.name]: target.value })}
                />
                <input
                    type="number"
                    name="metascore"
                    placeholder="metascore"
                    value={movie.metascore}
                    onChange={({ target }) => setMovie({ ...movie, [target.name]: target.value })}
                />
                <input
                    type="text"
                    name="stars"
                    placeholder="stars"
                    value={movie.stars}
                    onChange={({ target }) => setMovie({ ...movie, [target.name]: target.value })}
                />
                <button>Update</button>
            </form>
        </div>
    );
};

export default UpdateMovieForm;