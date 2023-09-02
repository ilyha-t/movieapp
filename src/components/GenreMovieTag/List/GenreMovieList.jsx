import React, { Component } from 'react';

import GenreMovieItem from '../Item/GenreMovieItem';

import cl from './GenreMovieList.module.css';

export default class GenreMovieList extends Component {
  render() {
    return (
      <ul className={cl.genre__list}>
        {this.props.genres.values.map((genre) => (
          <GenreMovieItem key={genre} genre={genre} />
        ))}
      </ul>
    );
  }
}
