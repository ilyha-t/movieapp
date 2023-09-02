import React, { Component, Fragment } from 'react';
import { Pagination, Tabs } from 'antd';

import HttpService from '../../services/http';
import MovieList from '../MovieList/MovieList';
import ErrorRequestData from '../Exceptions/ErrorRequestData';
import DoubleLoader from '../Loaders/DoubleLoader/DoubleLoader';
import SearchInput from '../SearchInput/SearchInput';
import { ProviderApp } from '../Store';
import NothingFound from '../Exceptions/NothingFound/NothingFound';
import { NoRatedMovies, NothingFoundDescr } from '../Exceptions/ContentException';

import cl from './App.module.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      initial: true,
      movies: { results: [] },
      exception: false,
      genres: null,
      loading: false,
      searchValue: null,
      currentPage: null,
      httpClient: new HttpService(),
      ratedMovies: { results: [], total_results: 0, page: 1 },
      rateFunc: this.rateFilm,
    };
  }

  debounceRequest = (f, delay) => {
    let timeout;
    return (...args) => {
      this.setState({ searchValue: args });
      clearInterval(timeout);
      timeout = setTimeout(() => f.apply(this, args), delay);
    };
  };

  searchFilm = (value, page = 1) => {
    this.setState({ loading: true, currentPage: page });
    new Promise((resolve) => {
      const response = this.state.httpClient.getFilmsByQuery(value, page);
      resolve(response);
    })
      .then((response) => {
        // Определяем, оценивался ли данный фильм ранее. Если да - отображаем соответсвующую оценку
        let result = new Array();
        for (let movie of response.results) {
          let isRated = false;
          for (let ratedMovie of this.state.ratedMovies.results) {
            if (movie.id === ratedMovie.id) {
              result.push(ratedMovie);
              isRated = true;
              break;
            }
          }

          if (!isRated) {
            result.push(movie);
          }
        }
        this.setState({ movies: { ...response, results: result }, loading: false });
      })
      .catch(() => this.setState({ exception: true, loading: false }));
  };

  rateFilm = (rate, ratedMovie) => {
    const oldData = JSON.parse(localStorage.getItem('rateMovies'));

    if (rate === 0) {
      const newStorage = {
        results: oldData.results.filter((item) => item.id !== ratedMovie.id),
        total_results: this.state.ratedMovies.total_results - 1,
      };
      localStorage.setItem('rateMovies', JSON.stringify(newStorage));
      this.setState(() => {
        return { ratedMovies: newStorage };
      });
      return;
    }

    let findIndexMovie = -1;
    for (const searchMovie of oldData.results) {
      if (searchMovie.id === ratedMovie.id) {
        findIndexMovie = oldData.results.indexOf(searchMovie);
        break;
      }
    }

    if (findIndexMovie === -1) {
      let newData = {
        results: [...oldData.results, { ...ratedMovie, rate: rate }],
        total_results: this.state.ratedMovies.total_results + 1,
      };

      localStorage.setItem('rateMovies', JSON.stringify(newData));
      this.setState(() => {
        return { ratedMovies: newData };
      });
    } else {
      const newObject = {
        ...oldData.results[findIndexMovie],
        rate: rate,
      };

      const newStorage = {
        results: [...oldData.results.slice(0, findIndexMovie), newObject, ...oldData.results.slice(findIndexMovie + 1)],
        total_results: this.state.ratedMovies.total_results,
      };

      localStorage.setItem('rateMovies', JSON.stringify(newStorage));
      this.setState({ ratedMovies: newStorage });

      return;
    }
  };

  paginationRatedMovie = (page = 1) => {
    const DEFAULT_SHOW = 20;
    const results = this.state.ratedMovies.results;
    const afterPagination = results.filter(
      (movie) => results.indexOf(movie) < DEFAULT_SHOW * page && results.indexOf(movie) >= DEFAULT_SHOW * page - 20
    );
    this.setState((prevState) => {
      return { ratedMovies: { ...prevState, results: afterPagination } };
    });
  };

  searchFilmDebounce = this.debounceRequest(this.searchFilm, 500);

  componentDidMount() {
    new Promise((resolve) => {
      const response = this.state.httpClient.getGenresList();
      resolve(response);
    })
      .then((response) => {
        this.setState({ genres: response.genres, initial: false });
      })
      .catch(() => this.setState({ exception: true }));

    const prevDataLocalStorage = JSON.parse(localStorage.getItem('rateMovies'));

    this.setState(() => {
      return {
        ratedMovies: { ...prevDataLocalStorage },
      };
    });
  }

  render() {
    const { movies, exception, initial, searchValue, ratedMovies, loading } = this.state;
    if (localStorage.getItem('rateMovies') === null) {
      localStorage.setItem('rateMovies', JSON.stringify({ results: [], total_results: 0 }));
    }

    const initialC = initial ? <DoubleLoader className={cl.film__loader} /> : null;
    const exceptionC = exception ? <ErrorRequestData /> : null;
    const searchC = <SearchInput onChange={(e) => this.searchFilmDebounce(e)} />;
    const moviesC = movies.results.length ? (
      <Fragment>
        <MovieList movies={movies.results} />
        {!loading ? (
          <Pagination
            defaultCurrent={this.state.currentPage || 1}
            defaultPageSize={20}
            total={movies.total_results}
            showSizeChanger={false}
            onChange={(newPage) => this.searchFilmDebounce(searchValue[0], newPage)}
          />
        ) : null}
      </Fragment>
    ) : (
      <NothingFound exception={NothingFoundDescr} />
    );

    const ratedC = ratedMovies.results.length ? (
      <Fragment>
        {/*this.paginationRatedMovie(this.state.ratedMovies.page)*/}
        <MovieList movies={this.state.ratedMovies.results} />
        <Pagination
          defaultCurrent={1}
          defaultPageSize={20}
          total={ratedMovies.total_results}
          showSizeChanger={false}
          onChange={(newPage) => this.paginationRatedMovie(newPage)}
          className={cl.pagination}
        />
      </Fragment>
    ) : (
      <NothingFound exception={NoRatedMovies} />
    );

    const items = [
      {
        key: '1',
        label: 'Search',
        children: (
          <Fragment>
            {searchC}
            {moviesC}
          </Fragment>
        ),
      },
      {
        key: '2',
        label: 'Rated',
        children: <Fragment>{ratedC}</Fragment>,
      },
    ];

    return (
      <ProviderApp value={this.state}>
        <div className={cl.app__container}>
          {initialC}
          {exceptionC}
          {!initialC && !exception ? <Tabs defaultActiveKey="1" items={items} /> : null}
        </div>
      </ProviderApp>
    );
  }
}
