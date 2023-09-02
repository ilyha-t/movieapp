import React, { Component } from 'react';

import MovieItem from '../MovieItem/MovieItem';
import { ConsumerApp } from '../Store';
import DoubleLoader from '../Loaders/DoubleLoader/DoubleLoader';

import cl from './MovieList.module.css';

export default class MovieList extends Component {
  render() {
    return (
      <ConsumerApp>
        {({ genres, loading }) => {
          return (
            <div className={cl.movie__list}>
              {loading ? (
                <DoubleLoader className={cl.movie__loader} />
              ) : (
                this.props.movies.map((movie) => <MovieItem key={movie.id} movie={movie} genres={genres} />)
              )}
            </div>
          );
        }}
      </ConsumerApp>
    );
  }
}
