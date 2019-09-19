import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
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
        const id = match.params.id;
        const movieToUpdate = movies.find(movie => `${movie.id}` === id);
        if (movieToUpdate) {
            setMovie(movieToUpdate);
        }
    }, [match, movies])

    const handleSubmit = () => {
        axios
          .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
          .then(res => console.log(res))
          .catch(err => console.log(err.response));
    };

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
                <Link to="/" onClick={handleSubmit}><button>Update</button></Link>
            </form>
        </div>
    );
};

export default UpdateMovieForm;