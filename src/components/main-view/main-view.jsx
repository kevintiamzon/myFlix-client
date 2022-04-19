import React from 'react';
import { MovieCard } from './movie-card';
import { MovieView } from '../movie-view/view-movie';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Pulp Fiction', Description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', ImagePath: 'https://i.imgur.com/lut5eCG.jpeg'},
        { _id: 2, Title: 'Once Upon a Time in Hollywood', Description: 'A faded television actor and his stunt double strive to achieve fame and success in the final years of Hollywood\'s Golden Age in 1969 Los Angeles.', ImagePath: 'https://i.imgur.com/3ZXMTMB.jpeg'},
        { _id: 3, Title: 'Kill Bill Vol. 1', Description: 'After awakening from a four-year coma, a former assassin wreaks vengeance on the team of assassins who betrayed her.', ImagePath: 'https://i.imgur.com/G5t8PeP.jpeg'}
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">No movies to show!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie =>(
         <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
         ))
         }
      </div>
    );
  }

}