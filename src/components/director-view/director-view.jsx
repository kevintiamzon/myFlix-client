import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import { Col, Container, Row } from 'react-bootstrap';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;
    return ( 
      <Container className="director-view">
        <Row>
          <Col className="label">Director: </Col>
          <Col className="value">{director.Name}</Col>
        </Row>
        <Row>
          <Col className="label">Birth: </Col>
          <Col className="value">{director.Birth}</Col>
        </Row>
        <Row>
          <Col className="label">Death: </Col>
          <Col className="value">{director.death}</Col>
        </Row>
        <Row>
          <Col className="label">Bio: </Col>
          <Col className="value">{director.bio}</Col>
        </Row>
        <Button onClick={() => { onBackClick(null); }} variant="warning">Back</Button>
      </Container>
    )
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired
  }).isRequired
};