import { useQuery } from "react-query";
import { IGetMoviesResult, getMovies } from "../api/movieApi";
import styled from "styled-components";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background-color: #000;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

const Banner = styled.div<{bgPhoto: string}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.bgPhoto});
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
  const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
  console.log(data, isLoading);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(data?.results[19].backdrop_path || "")}
          >
            <Title>{data?.results[19].title}</Title>
            <Overview>{data?.results[19].overview}</Overview>
          </Banner>
        </>
      )
    }
    </Wrapper>
  )
}

export default Home;