import React, { Component } from 'react';
import { API_URL, API_KEY } from '../../config';
import Navbar from '../elements/Navbar/Navbar';
import MovieInfo from '../elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import Actor from '../elements/Actor/Actor';
import './Movie.css';

class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
    this.fetchMovie(endpoint);
  }
  fetchMovie = endpoint => {
    fetch(endpoint)
      .then(res => res.json())
      .then(res => {
        if (res.status_code) {
          this.setState({ loading: false });
        } else {
          this.setState({ movie: res }, () => {
            const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`;
            fetch(endpoint)
              .then(res => res.json())
              .then(res => {
                const directors = res.crew.filter(
                  member => member.job === 'Director'
                );
                this.setState({
                  actors: res.cast,
                  directors: directors,
                  loading: false
                });
              });
          });
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className='rmdb-movie'>
        {this.state.movie ? (
          <div className='wrapper'>
            <Navbar movie={this.props.location.movieName} />
            <MovieInfo
              movie={this.state.movie}
              directors={this.state.directors}
            />
            <MovieInfoBar
              time={this.state.movie.runtime}
              budget={this.state.movie.budget}
              revenue={this.state.movie.revenue}
            />
          </div>
        ) : null}
        {this.state.actors ? (
          <div className='rmdb-movie-grid'>
            <FourColGrid header={'Actors'}>
              {this.state.actors.map((element, index) => {
                return <Actor key={index} actor={element} />;
              })}
            </FourColGrid>
          </div>
        ) : null}
        {!this.state.actors && !this.state.loading ? (
          <h1>No Movie Found</h1>
        ) : null}
      </div>
    );
  }
}

export default Movie;
