import { useQuery } from "react-query";
import styled from "styled-components";
import { IGetMoviesResult, getTvSeries } from "../api/movieApi";
import Carousel from "../components/Carousel";

// ------ Styled ------ //
const Wrapper = styled.div`
  margin-top: 200px;
  background-color: #000;
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

// ------ interface ------ //
interface ITvCategory {
  airing_today: string;
  on_the_air: string;
  popular: string;
  top_rated: string;
}
const tvCategory: ITvCategory = {
  airing_today: "airing_today",
  on_the_air: "on_the_air",
  popular: "popular",
  top_rated: "top_rated"
};


function Tv(){
  const { data: tvAiringToday, isLoading } = useQuery<IGetMoviesResult>(["tv", tvCategory.airing_today], () => getTvSeries(tvCategory.airing_today));
  const { data: tvOnTheAir } = useQuery<IGetMoviesResult>(["tv", tvCategory.on_the_air], () => getTvSeries(tvCategory.on_the_air));
  const { data: tvPopular } = useQuery<IGetMoviesResult>(["tv", tvCategory.popular], () => getTvSeries(tvCategory.popular));
  const { data: tvTopRated } = useQuery<IGetMoviesResult>(["tv", tvCategory.top_rated], () => getTvSeries(tvCategory.top_rated));

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Carousel 
            data={tvAiringToday || null}
            title="Airing Today"
            menuName="tv"
            category={tvCategory.airing_today}
          />
          <Carousel 
            data={tvOnTheAir || null}
            title="On the Air" 
            menuName="tv"
            category={tvCategory.on_the_air}
          />
          <Carousel 
            data={tvPopular || null}
            title="Popular"
            menuName="tv"
            category={tvCategory.popular}
          />
          <Carousel 
            data={tvTopRated || null}
            title="Top Rated" 
            menuName="tv"
            category={tvCategory.top_rated}
          />
        </>
      )
    }
    </Wrapper>
  )
}

export default Tv;