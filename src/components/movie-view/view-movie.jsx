import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { ListGroupItem } from 'react-bootstrap';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </Card.Text>
      </Card.Body>
      <ListGroup classname="list-group-flush">
          <ListGroupItem >Director: {movie.Director.Name}</ListGroupItem>
          <ListGroupItem> Genre: {movie.Genre.Name}</ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Button onClick={() => { onBackClick(null); }}>Back</Button>
      </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Genre: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};