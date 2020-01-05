import React, { useState, useEffect } from 'react';
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE
} from '../../config';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';

import './Home.css';

const Home = () => {
  const [state, setState] = useState({ movies: [] });

  const fetchMovies = async endpoint => {
    const params = new URLSearchParams(endpoint);
    if (!params.get('page')) {
      setState(prev => ({
        ...prev,
        movies: [],
        searchTerm: params.get('query')
      }));
    }

    const result = await (await fetch(endpoint)).json();
    setState(prev => ({
      ...prev,
      movies: [...prev.movies, ...result.results],
      heroImage: prev.heroImage || result.results[0],
      currentPage: result.page,
      totalPages: result.total_pages
    }));
  };

  useEffect(() => {
    fetchMovies(`${API_URL}movie/popular?api_key=${API_KEY}`);
  }, []);

  const searchItems = searchTerm => {
    let endpoint = `${API_URL}search/movie?api_key=${API_KEY}&query=${searchTerm}`;
    if (!searchTerm) {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}`;
    }
    fetchMovies(endpoint);
  };

  const LoadMoreMovie = () => {
    const { searchTerm, currentPage } = state;
    let endpoint = `${API_URL}search/movie?api_key=${searchTerm}&page=${currentPage +
      1}`;
    if (!searchTerm) {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&page=${currentPage +
        1}`;
    }
    fetchMovies(endpoint);
  };

  return (
    <div className='rmdb-home'>
      {state.heroImage ? (
        <div>
          <HeroImage
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`}
            title={state.heroImage.original_title}
            text={state.heroImage.overview}
          />
          <SearchBar callback={searchItems} />
        </div>
      ) : null}

      <div className='rmdb-home-grid'>
        <FourColGrid
          header={state.searchTerm ? 'Search Result' : 'Popular Movies'}>
          {state.movies.map((element, index) => {
            return (
              <MovieThumb
                key={index}
                clickable={true}
                image={
                  element.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`
                    : './images/no_image.jpg'
                }
                movieId={element.id}
                movieName={element.original_title}
              />
            );
          })}
        </FourColGrid>
        <LoadMoreBtn text='Load More' onClick={LoadMoreMovie} />
      </div>
    </div>
  );
};

export default Home;
