import React from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from "./Movies/UpdateMovieForm";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      savedList: [],
      movies: []
    };
  }

  addToSavedList = movie => {
    this.setState({ movies: [...this.state.savedList, movie] })
  };

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/movies/`)
      .then(res => {
        this.setState({ movies: res.data })
      })
      .catch(err => console.log(err.response))
  }
  render () {
  return (
    <>
      <SavedList list={this.state.savedList} />
      <Route exact path="/"
        render={() => {
          console.log(this.state.movies)
          return <MovieList movies={this.state.movies} />;
        }}
      />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={this.addToSavedList} savedList={this.state.savedList} />;
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return <UpdateMovieForm {...props} movies={this.state.movies} />;
        }}
      />
    </>
  );
};
};