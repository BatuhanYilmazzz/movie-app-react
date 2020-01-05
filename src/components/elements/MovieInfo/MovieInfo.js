import React from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../../config';
import MovieThumb from '../MovieThumb/MovieThumb';
import './MovieInfo.css';

const MovieInfo = props => {
  return (
    <div className='rmdb-movieinfo'>
      <div className='rmdb-movieinfo-content'>
        <div className='rmdb-movieinfo-thumb'>
          <MovieThumb
            image={
              props.movie.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${props.movie.poster_path}`
                : './images/no_image.jpg'
            }
            clickable={false}
          />
        </div>
        <div className='rmdb-movieinfo-text'>
          <h1>{props.movie.title}</h1>
          <h3>PLOT</h3>
          <p>{props.movie.overview}</p>
          <div className='rmdb-rating'>
            <p className='rmdb-score'>Score: {props.movie.vote_average}</p>
          </div>
          <h3>DIRECTORS</h3>
          {props.directors.map((element, index) => {
            return (
              <p key={index} className='rmdb-director'>
                {element.name}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
