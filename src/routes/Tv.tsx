import { useQuery } from "react-query";
import styled from "styled-components";
import { IGetMoviesResult, getTvSeries } from "../api/movieApi";
import Slider from "../components/Slider";

const Wrap = styled.div`
  margin-top: 100px;
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

function Tv(){
  const { data: tvAiringToday, isLoading } = useQuery<IGetMoviesResult>(["tv", "airing_today"], () => getTvSeries("airing_today"));
  const { data: tvOnTheAir } = useQuery<IGetMoviesResult>(["tv", "on_the_air"], () => getTvSeries("on_the_air"));
  const { data: tvPopular } = useQuery<IGetMoviesResult>(["tv", "popular"], () => getTvSeries("popular"));
  const { data: tvTopRated } = useQuery<IGetMoviesResult>(["tv", "top_rated"], () => getTvSeries("top_rated"));

  return (
    <>
    {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Wrap>
          <Slider data={tvAiringToday || null} category="airing_today" title="Airing Today" />
          <Slider data={tvOnTheAir || null} category="on_the_air" title="On The Air" />
          <Slider data={tvPopular || null} category="popular" title="Popular" />
          <Slider data={tvTopRated || null} category="top_rated" title="Top Rated" />
        </Wrap>
      )
    }
    </>
  )
}

export default Tv;