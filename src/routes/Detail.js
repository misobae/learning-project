import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/MovieDetails";

function Detail(){
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  }
  useEffect(() => {
    getMovie();
  }, [])
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MovieDetails
      coverImg={movie.medium_cover_image}
      title={movie.title}
      rating={movie.rating}
      runtime={movie.runtime}
      genres={movie.genres}
      description={movie.description_full}
    />
  )
}
export default Detail;