import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, FormControl } from 'react-bootstrap';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to server for authentication */
    /* Then call props.onRegister(username) */
     props.onRegister(username);
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Select a Username:</Form.Label>
        <Form.Control
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        placeholder="Select a username"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Set Your Password:</Form.Label>
        <Form.Control
        type="text"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        minLength="8"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Your Email:</Form.Label>
        <Form.Control
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        placeholder="Enter Your Email"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Your Birthday:</Form.Label>
        <Form.Control
        type="text"
        value={birthday}
        onChange={e => setBirthday(e.target.value)}
        required
        placeholder="Enter Your Birthday"
        />
      </Form.Group>
      <Button type="submit" onClick={handleSubmit}>Sign Me Up!</Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  onRegister: PropTypes.func.isRequired
};