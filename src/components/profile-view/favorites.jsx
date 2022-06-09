import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Fragment, useState } from 'react';
import { Button, Card, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export function FavoriteMovies(props) {
  const { movies, favoriteMovies, currentUser, token } = props;
  const favoriteMoviesId= favoriteMovies.map(m=> m._id);
  const favoriteMoviesList = movies.filter(m => {
    return favoriteMoviesId.includes(m._id)
  })

  const handleMovieDelete = (movieId) => {
    axios.delete('https://kevins-movie-api.herokuapp.com/users/${currentuser}/movies/${movieId}', {
      headers: {Authorization: 'Bearer ${token}'}
    }).then(() => {
      alert('Movie removed from favorites.')
      window.open('/users/:username', '_self');
    }).catch(error => console.error(error))
  }

  return (
    <Fragment>
      {favoriteMoviesList.length === 0 ? (
        <p> No favorites to show. </p>
      ): (
        favoriteMoviesList.map((movie) => {
          return (
            <Col>
              <Card id="movie-card">
                <Link to={'/movies/${movie._id'}>
                  <Card.Img variant="top" src={movie.ImagePath} />
                </Link>
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.Description}</Card.Text>
                  <Link to={'/movies/${movie._id}'}>
                    <Button classname="button" variant="outline-primary" size="sm">See More</Button>
                  </Link>
                  <Button className="button" variant="outline-primary" size="sm" onClick={() => {handleMovieDelete(movie._id)}}>Remove From Favorites</Button>
                </Card.Body>
              </Card>
            </Col>
          )
        })
      )}
    </Fragment>
  )
}