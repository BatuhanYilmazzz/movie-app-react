import React, { Component } from 'react';
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
import Spinner from '../elements/Spinner/Spinner';

import './Home.css';

class Home extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: ''
  };
  /****************FETCH DATA ***************/
  componentDidMount() {
    this.setState({ loading: true });
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    this.fetchMovie(endpoint);
  }
  /************SEARCH BAR **************/

  searchItems = searchTerm => {
    let endpoint = '';
    this.setState({
      movies: [],
      loading: true,
      searchTerm: searchTerm
    });

    if (searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}`;
    }
    this.fetchMovie(endpoint);
  };

  /*****************LOAD MORE ************************/
  LoadMoreMovie = () => {
    let endpoint = '';
    this.setState({ loading: true });

    if (this.state.searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this
        .state.currentPage + 1}`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${
        this.state.searchTerm
      }&page=${this.state.currentPage + 1}`;
    }
    this.fetchItems(endpoint);
  };
  /**************FETCH FUNC *********************/
  fetchMovie = endpoint => {
    fetch(endpoint)
      .then(res => res.json())
      .then(res => {
        this.setState({
          movies: [...this.state.movies, ...res.results],
          heroImage: this.state.heroImage || res.results[0],
          loading: false,
          currentPage: res.pages,
          totalPages: res.total_pages
        });
      });
  };
  /*********RENDER ********************/
  render() {
    return (
      <div className='rmdb-home'>
        {this.state.heroImage ? (
          <div>
            <HeroImage
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
              title={this.state.heroImage.original_title}
              text={this.state.heroImage.overview}
            />
            <SearchBar callback={this.searchItems} />
          </div>
        ) : null}

        <FourColGrid />
        <Spinner />
        <LoadMoreBtn />
      </div>
    );
  }
}
export default Home;
