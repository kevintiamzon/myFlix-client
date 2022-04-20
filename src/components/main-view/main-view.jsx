import React from 'react';
import { MovieCard } from './movie-card';
import { MovieView } from '../movie-view/view-movie';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: 'Pulp Fiction',
          Description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
          ImagePath: 'https://i.imgur.com/G5t8PeP.jpeg',
          Genre: 'Drama',
          Director: 'Quentin Tarantino'
        },
        {
          _id: 2,
          Title: 'Once Upon a Time in Hollywood',
          Description: 'A faded television actor and his stunt double strive to achieve fame and success in the final years of Hollywood\'s Golden Age in 1969 Los Angeles.',
          ImagePath: 'https://i.imgur.com/3ZXMTMB.jpeg',
          Genre: 'Drama',
          Director: 'Quentin Tarantino'
        },
        {
          _id: 3,
          Title: 'Kill Bill Vol. 1',
          Description: 'After awakening from a four-year coma, a former assassin wreaks vengeance on the team of assassins who betrayed her.',
          ImagePath: 'https://i.imgur.com/G5t8PeP.jpeg',
          Genre: 'Action',
          Director: 'Quentin Tarantino'
        },
        {
          _id: 4,
          Title: 'Saving Private Ryan',
          Description: 'Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.',
          ImagePath: 'https://i.imgur.com/XzvmK.jpeg',
          Genre: 'Drama',
          Director: 'Steven Spielberg'
        },
        {
          _id: 5,
          Title: 'Jurassic Park',
          Description: 'A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park\'s cloned dinosaurs to run loose.',
          ImagePath:'https://i.imgur.com/MRiOqRK.jpeg',
          Genre: 'Action',
          Director: 'Steven Spielberg'
        },
        {
          _id: 6,
          Title: 'Catch Me if You Can',
          Description: 'Barely 21 yet, Frank is a skilled forger who has passed as a doctor, lawyer and pilot. FBI agent Carl becomes obsessed with tracking down the con man, who only revels in the pursuit.',
          ImagePath: 'https://i.imgur.com/2f6I72d.jpeg',
          Genre: 'Drama',
          Director: 'Steven Spielberg'
        },
        {
          _id: 7,
          Title: 'Chef',
          Description: 'A head chef quits his restaurant job and buys a food truck in an effort to reclaim his creative promise, while piecing back together his estranged family.',
          ImagePath: 'https://i.imgur.com/ltAdNSX.jpeg',
          Genre: 'Comedy',
          Director: 'Jon Favreau'
        },
        {
          _id: 8,
          Title: 'Iron Man',
          Description: 'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.',
          ImagePath: 'https://i.imgur.com/14RImuQ.jpeg',
          Genre: 'Action',
          Director: 'Jon Favreau'
        },
        {
          _id: 9,
          Title: 'Elf',
          Description: 'Raised as an over-sized elf, a human travels from the North Pole to NYC to meet his biological father who doesn\'t know he exists and is in desperate need of some Christmas spirit.',
          ImagePath: 'https://images.moviesanywhere.com/d2da6ebf6cf6933957bdfb4c6e083dc6/3bbdcfdd-6222-48ec-b939-a13793b18632.jpg',
          Genre: 'Comedy',
          Director: 'Jon Favreau'
        },
        {
          _id: 10,
          Title: 'The Batman (2022)',
          Description: 'When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city\'s hidden corruption and question his family\'s involvement.',
          ImagePath: 'https://i.imgur.com/JH1AIRI.jpeg',
          Genre: 'Action',
          Director: 'Matt Reeves'
        }
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