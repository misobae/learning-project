import { useQuery } from "react-query";
import styled from "styled-components";
import { IGetMoviesResult, getMovies } from "../api/movieApi";
import { makeImagePath } from "../utils";
import Carousel from "../components/Carousel";

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

function Home(){
  const { data: moviesNowPlaying, isLoading } = useQuery<IGetMoviesResult>(["movies", "now_playing"], () => getMovies("now_playing"));
  const { data: moviesPopular } = useQuery<IGetMoviesResult>(["movies", "popular"], () => getMovies("popular"));
  const { data: moviesTopRated } = useQuery<IGetMoviesResult>(["movies", "top_rated"], () => getMovies("top_rated"));
  const { data: moviesUpcoming } = useQuery<IGetMoviesResult>(["movies", "upcoming"], () => getMovies("upcoming"));
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

          <Carousel data={moviesNowPlaying || null} title="Now Playing" />
          <Carousel data={moviesPopular || null} title="Popular" />
          <Carousel data={moviesTopRated || null} title="Top Rated" />
          <Carousel data={moviesUpcoming || null} title="Upcoming" />
        </>
      )
    }
    </Wrapper>
  )
}

export default Home;