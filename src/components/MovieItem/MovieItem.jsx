import React, { Component } from 'react';
import { format, parseISO } from 'date-fns';
import { Rate } from 'antd';

import { IMAGE_URL } from '../../config/config';
import GenreMovieList from '../GenreMovieTag/List/GenreMovieList';
import RatingMark from '../RatingMark/RatingMark';
import { ConsumerApp } from '../Store';

import cl from './MovieItem.module.css';
import noImage from './assets/no-image.jpg';

export default class MovieItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: { values: null, loaded: false },
    };
  }

  handleImageError = (e) => {
    e.target.src = noImage;
  };

  matchGenreMovie = () => {
    let genres_name = new Array();
    for (let genre_id of this.props.movie.genre_ids) {
      for (let genre of this.props.genres) {
        if (genre_id === genre.id) {
          genres_name.push(genre.name);
          break;
        }
      }
    }

    this.setState({ genres: { values: genres_name, loaded: true } });
  };

  translateDate = (date) => {
    try {
      return format(parseISO(date), 'MMMM d, y');
    } catch (e) {
      return;
    }
  };

  componentDidMount() {
    this.matchGenreMovie();
  }

  render() {
    const { title, release_date, overview, vote_average } = this.props.movie;
    const rate =
      this.props.movie.vote_average > 0 ? <RatingMark rating={vote_average} customClass={cl.rating__position} /> : null;

    return (
      <ConsumerApp>
        {({ rateFunc }) => {
          return (
            <div className={cl.movie}>
              <img
                src={`${IMAGE_URL}` + this.props.movie.backdrop_path}
                alt="Movie Poster"
                onError={this.handleImageError}
                className={cl.movie__image}
              />
              <div className={cl.movie__info}>
                <h1 className={cl.movie__title}>{title}</h1>
                {rate}
                <p className={cl.movie__release_date}>{this.translateDate(release_date)}</p>
                {this.state.genres.loaded ? <GenreMovieList genres={this.state.genres} /> : null}
                <p className={cl.movie__description}>{overview}</p>
                <Rate
                  count={10}
                  defaultValue={this.props.movie.rate || 0}
                  className={cl.movie__rate}
                  onChange={(e) => rateFunc(e, this.props.movie)}
                />
              </div>
            </div>
          );
        }}
      </ConsumerApp>
    );
  }
}
