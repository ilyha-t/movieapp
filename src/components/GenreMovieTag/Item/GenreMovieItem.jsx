import React, { Component } from 'react';

import cl from './GenreMovieItem.module.css';

export default class GenreMovieItem extends Component {
  render() {
    return <li className={cl.genre__item}>{this.props.genre}</li>;
  }
}
