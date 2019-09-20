import React from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from "./Movies/UpdateMovieForm";
import AddMovieForm from "./Movies/AddMovieForm";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedList: [],
      movies: []
    };
  }

  addToSavedList = movie => {
    this.setState({ savedList: [...this.state.savedList, movie] });
  };

  componentDidMount() {
    this.getMovies();
  }

  getMovies = () => {
    axios
      .get(`http://localhost:5000/api/movies/`)
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err.response));
  }

  addMovie = () => {
    axios
      .post("http://localhost:5000/api/movies/")
      .then(res => this.setState({ movies: [...this.state.movies, res.data] }))
      .catch(err => console.log(err.response));
  }

  render() {
    return (
      <>
        <SavedList list={this.state.savedList} />
        <Link to="/add-movie">Add Movie</Link>
        <Route exact path="/"
          render={() => {
            return <MovieList movies={this.state.movies} />;
          }}
        />
        <Route
          path="/movies/:id"
          render={props => {
            return <Movie
              {...props}
              getMovies={this.getMovies}
              addToSavedList={this.addToSavedList}
              savedList={this.state.savedList} />;
          }}
        />
        <Route
          path="/update-movie/:id"
          render={props => {
            return <UpdateMovieForm
              {...props}
              getMovies={this.getMovies}
              movies={this.state.movies} />;
          }}
        />
        <Route
          path="/add-movie"
          render={props => {
            return <AddMovieForm
              {...props}
              getMovies={this.getMovies}
              addMovie={this.addMovie}
              movies={this.state.movies} />;
          }}
        />
      </>
    );
  };
};