import sadSmile from './NothingFound/assets/sadSmile.svg';
import movieIcon from './NothingFound/assets/movieIcon.svg';

const NothingFoundDescr = {
  icon: sadSmile,
  descr: 'Sorry! Nothing Found.\nTry change your request.',
};

const NoRatedMovies = {
  icon: movieIcon,
  descr: 'No rated movies!\nLets go!',
};

const testMockMovie = {
  title: 'Ля Комедия 2, или Совсем другая история с элементами большого искусства',
  genre_ids: [28, 12, 16, 35, 878],
  vote_average: 8,
  release_date: '2015-07-06',
  backdrop_path: '/hoszursvZR1C054sTXVQBcBDory.jpg',
  overview:
    'Love Hotel. The best place to spend your holiday on February 14th. So this time the doors of the hotel are open for everyone who wants to make Valentines Day special, wants to believe in ',
};

export { NothingFoundDescr, NoRatedMovies, testMockMovie };
