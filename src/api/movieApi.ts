const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
}
export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
export function getMovies(lists: string){
  return (
    fetch(`${BASE_PATH}/movie/${lists}?api_key=${API_KEY}`)
      .then((response) => response.json())
  );
}
export function getTvSeries(lists: string){
  return (
    fetch(`${BASE_PATH}/tv/${lists}?api_key=${API_KEY}`)
      .then((response) => response.json())
  );
}


interface ISearchResult {
  id: number;
  name?: string;
  title?: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  original_title: string;
  release_date?: string;
  first_air_date?: string;
}

export interface IGetSearch {
  page: number;
  results: ISearchResult[];
  total_pages: number;
  total_results: number;
  dates: string;
}
export function getSearchMovie(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1`
  ).then(response => {
    return response.json();
  });
}
export function getSearchTv(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`
  ).then(response => {
    return response.json();
  });
}