import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Container, } from 'react-bootstrap';
import axios from 'axios';
import { link } from "react-router-dom";
import './registration-view.scss';

export function RegistrationView(props) {
  const [ name, setName ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  const [ values, setValues ] = useState({
    nameErr: '',
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });

  const validate = () => {
    let isReq = true;
    if(name){
      setValues({...values, nameErr: 'Name is required'});
      isReq = false;
    }
    if(!username){
      setValues({...values, usernameErr: 'Username is Required'});
      isReq = false;
    } else if(username.length < 5){
      setValues({...values, usernameErr: 'Username must be longer than 5 characters'});
      isReq = false;
    }
    if(!password){
      setValues({...values, passwordErr: 'Password is Required'});
      isReq = false;
    } else if(password.length < 6){
      setValues({...values, passwordErr: 'Password must be at least 6 characters'});
      isReq = false;
    }
    if(!email){
      setValues({...values, emailErr: 'Email is Required'});
      isReq = false;
    } else if(email.indexOf('@') === -1){
      setValues({...values, emailErr: 'Enter a valid Email'});
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq){
      axios.post('https://kevins-movie-api.herokuapp.com/users', {
        Name: name,
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        alert('Registration successful, please login!');
        window.open('/', '_self'); //the second argument "_self" is necessary so that the page will open in the current tab
      })
      .catch(response => {
        console.error(response);
        alert('Unable to register your account');
      });
    }
  };

  return (
    <Row classname="mt-5">
      <Col md={12}>
        <Form>
          <h3>Sign Up</h3>
          <p></p>
          <Form.Group controlId="formUsername" className="reg-form-inputs">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
            {values.usernameErr && <p>{values.usernameErr}</p>}
          </Form.Group>

          <Form.Group controlId="formPassword" className="reg-form-inputs">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
            {values.passwordErr && <p>{values.passwordErr}</p>}
          </Form.Group>

          <Form.Group controlId="Email" className="reg-form-inputs">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
            {values.emailErr && <p>{values.emailErr}</p>}
          </Form.Group>

          <Form.Group controlId="updateBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control type="date" name="birthday" onChange={e => setBirthday(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
          <p></p>
          <p>Already Registered <Link to={'/'}>Sign In</Link> here</p>
        </Form>
      </Col>
    </Row>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired
  }),
};