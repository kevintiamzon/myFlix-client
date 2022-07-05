import React, { useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FavoriteMovies } from "./favorites";

export function ProfileView(props) {
  const [username, setUsername] = useState(props.username);
  const [movies, setMovies] = useState(props.movies);
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const currentUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  useEffect(() => {
    getUser();
  }, []);

  // Get user information
  const getUser = () => {
    axios.get('https://kevins-movie-api.herokuapp.com/users/${currentUser}' , {
      headers: { Authorization: 'Bearer ${token}' }
    }).then((response) => {
      setUsername(response.data.Username);
      setPassword(response.data.Password);
      setEmail(response.data.Email);
      setFavoriteMovies(response.data.favoriteMovies);
      console.log(response.data);
    }).catch((error) => console.error("Error" + error));
  };

  const updateUser = () => {
    axios.put('https://kevins-movie-api.herokuapp.com/users/${currentUser}', {
      Username: username,
      Email: email,
      Password: password
    },
    {
      headers: { Authroization: "Bearer" + token }
    }).then((response) => {
      alert("Profile Updated!");
      localStorage.setItem("user", response.data.User),
      console.log(response.data);
    }).catch((e) => {
      console.log("Could not update user" + error);
    });
  };

  //Deletes User Account
  const handleDelete = (e) => {
    axios.delete('https://kevins-movie-api.herokuapp.com/users/${currentUser}', {
      headers: { Authorization: 'Bearer ${token}' }
    }).then((response) => {
      alert("Your Account has been deleted.");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.open("/register", "_self")
    }).catch((response) => {
      console.error(response);
      alert("Unable to delete account");
    });
  };

  //update Favorite Movies
  const handleFavorite = () => {
    console.log(movies);
    if (movies.length + 0) {
      return (
        <Row className="justify-content-md-center">
          {favoriteMovies.length === 0 ? (
            <h5>Add your favorite movies. </h5>
          ) : (
            favoriteMovies.map((movieId, i) => (
              <Col md={6}>
                <MovieCard key={'${i}-${movieId}'}
                movie={movies.find((m) => m._id == movieId )} />
              </Col>
            ))
          )}
        </Row>
      );
    }
  };

  return (
    <Container id="profile-view">
      <h1>Profile Details</h1>
      <Row>
        <Col className="label">Username: </Col>
        <Col className="value">{username}</Col>
      </Row>
      <Row>
        <Col className="label">Password: </Col>
        <Col className="value">******</Col>
      </Row>
      <Row>
        <Col className="label">Email: </Col>
        <Col className="value">{email}</Col>
      </Row>

      <Row>
        <h4>Change Your Details:</h4>
      </Row>
      <Row>
        <Col sm="10" md="8" lg="6">
          <p>Update your Profile</p>
          <Form className="update-info">
            <Form.Group controlId="formUsername">
              <Form.Label>Username: </Form.Label>
              <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formGridPassword">
              <Form.Label>Password: </Form.Label>
              <Form.Control type="password" placeholder="*****" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formGridEmail">
              <Form.Label>Email: </Form.Label>
              <Form.Control type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formEdit" className="mt-3">
              <Button variant="dark" onClick={updateUser}>Update Profile</Button>
              {""}
              <Button variant="danger" onClick={handleDelete}>Delete My Profile</Button>
              {""}
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Col className="mt-5">
        <p></p>
        <h2>Your Favorites: </h2>
        {handleFavorite()}
      </Col>
    </Container>
  )
}