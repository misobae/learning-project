import { API_URL } from "../app/(home)/page";
import styles from "../styles/movie-info.module.css";

async function getMovie(id:string) {
  // console.log(`Fetching movies: ${Date.now()}`);
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

export default async function MovieInfo({id}: {id:string}) {
  const movie = await getMovie(id);
  return (
    <article className={styles.container}>
      <img className={styles.poster} src={movie.poster_path} alt={movie.title} />
      <div className={styles.info}>
        <h1 className={styles.title}>{movie.title}</h1>
        <strong>⭐️ {movie.vote_average.toFixed(1)}</strong>
        <p>{movie.overview}</p>
        <a href={movie.homepage} target="_blank">Homepage &rarr;</a>
      </div>
    </article>
  )
}