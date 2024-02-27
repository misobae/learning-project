import { useQuery } from "react-query";
import styled from "styled-components";
import { IGetMoviesResult, getMovies } from "../api/movieApi";
import { makeImagePath } from "../utils";
import Carousel from "../components/Carousel";

// ------ Styled ------ //
const Wrapper = styled.div`
  background-color: #000;
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;
const Banner = styled.div<{bgphoto: string}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.bgphoto});
  background-size: cover;
`;
const Title = styled.h2`
  margin-bottom: 16px;
  font-size: 62px;
`;
const Overview = styled.p`
  width: 50%;
  font-size: 20px;
`;

// ------ interface ------ //
interface IMovieCategory {
  now_playing: string;
  popular: string;
  top_rated: string;
  upcoming: string;
}
const movieCategory: IMovieCategory = {
  now_playing: "now_playing",
  popular: "popular",
  top_rated: "top_rated",
  upcoming: "upcoming"
};

function Home(){
  const { data: moviesNowPlaying, isLoading } = useQuery<IGetMoviesResult>(["movie", movieCategory.now_playing], () => getMovies(movieCategory.now_playing));
  const { data: moviesPopular } = useQuery<IGetMoviesResult>(["movie", movieCategory.popular], () => getMovies(movieCategory.popular));
  const { data: moviesTopRated } = useQuery<IGetMoviesResult>(["movie", movieCategory.top_rated], () => getMovies(movieCategory.top_rated));
  const { data: moviesUpcoming } = useQuery<IGetMoviesResult>(["movie", movieCategory.upcoming], () => getMovies(movieCategory.upcoming));

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgphoto={makeImagePath(moviesNowPlaying?.results[0].backdrop_path || "")}>
            <Title>{moviesNowPlaying?.results[0].title}</Title>
            <Overview>{moviesNowPlaying?.results[0].overview}</Overview>
          </Banner>

          <Carousel 
            data={moviesNowPlaying || null}
            title="Now Playing"
            menuName="movie"
            category={movieCategory.now_playing}
          />
          <Carousel 
            data={moviesPopular || null}
            title="Popular" 
            menuName="movie"
            category={movieCategory.popular}
          />
          <Carousel 
            data={moviesTopRated || null}
            title="Top Rated"
            menuName="movie"
            category={movieCategory.top_rated}
          />
          <Carousel 
            data={moviesUpcoming || null}
            title="Upcoming" 
            menuName="movie"
            category={movieCategory.upcoming}
          />
        </>
      )
    }
    </Wrapper>
  )
}

export default Home;