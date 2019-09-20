import React, { useState } from "react";
import axios from "axios";

const initialState = {
    id: Date.now(),
    title: "",
    director: "",
    metascore: 0,
    stars: []
}

const AddMovieForm = props => {

    const [movie, setMovie] = useState(initialState);

    const handleSubmit = event => {
        event.preventDefault();
        axios
            .post(`http://localhost:5000/api/movies`, movie)
            .then(res => {
                console.log(res)
                props.getMovies();
                setMovie(initialState);
                props.history.push("/")
            })
            .catch(err => console.log(err.response));
    };

    return (
        <div>
            <h2>Add Movie</h2>
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
                    onChange={({ target }) => {
                        const actors = target.value;
                        const actorsArr = actors.split(",");
                        setMovie({ ...movie, [target.name]: actorsArr })
                    }}
                />
                <button onClick={handleSubmit}>Add</button>
            </form>
        </div>
    );
};

export default AddMovieForm;