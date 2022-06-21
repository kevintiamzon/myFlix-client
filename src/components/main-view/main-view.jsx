import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/view-movie';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { FavoriteMovies } from '../profile-view/favorites';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component {

  constructor(){
 // Initial state is set to null  
    super();
    this.state = {
      movies: [],
      user: null
    };
  }

  getMovies(token) {
    axios.get('https://kevins-movie-api.herokuapp.com/movies', {
      headers: { Authorization: 'Bearer ${token}'}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

/* When a movie is clicked, this function is invoked and updates the state of the
'selectedMovie' *property to that movie*/

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

/* When a user successfully logs in, this function updates the user's property in state
to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
  }

  render() {
    const { movies, user } = this.state;

    return (
    <Router>
      <Row className="main-view justify-content-md-center">
        {/*If the state of 'selectedMovie' is not null, that selected movie will be returned
        otherwise, all *movies will be returned*/}
        <Route exact path="/" render={() => {
          if (!user) return <Col>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
          if (movies.length === 0) return <div className="main-view" />;
          return movies.map(m => (
            <Col md={3} key={m._id}>
              <MovieCard movie={m} />
            </Col>
          ))
        }} />
        <Route path="/register" render={() => {
          if (user) return <Redirect to="/" />
          return <Col>
          <RegistrationView />
          </Col>
        }} />
        <Route exact path ="/movies" render={() => {
          return movies.map((m) => (
            <Col md={3} key={m._id}>
              <MovieCard movie={m} />
            </Col>
          ));
        }} />
        <Route exact path="/movies/:movieId" render={({ match, history }) => {
          return <Col md={8}>
            <MovieView movie={movies.find(m => m.id === match.params.movieId)} onBackClick={() => history.goBack()} />
          </Col>
        }} />
        <Route exact path="/genres/:name" render={({ match, history }) => {
          if (movies.length === 0) return <div className="main-view" />;
          return <Col md={8}>
            <GenreView genre={movies.find(m => m.Genre.name === match.params.name).Genre} onBackClick={() => history.goBack()} />
          </Col>
        }} />
        <Route exact path="directors/:name" render={({ match }) => {
          if (movies.length === 0) return <div className="main-view" />;
          return <Col md={8}>
            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
          </Col>
        }} />
        <Route path={'/users/:username'} render={({ history }) => {
          if (!user) return (
            <Col>
            <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
            </Col>
          );
          if (movies.length === 0) return <div className='mainview' />;
          return (
            <Col md={8}>
              <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
            </Col>
          );
        }} />
      </Row>
    </Router>
    );
  }

}