import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import { IGetMoviesResult, getSearchMovie, getSearchTv } from "../api/movieApi";
import { makeImagePath } from "../utils";
import SearchModal from "../components/SearchModal";

// ------ Styled ------ //
const Wrapper = styled.div`
  width: 80%;
  margin: 100px auto;
  background-color: #000;
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;
const Title = styled.h2`
  margin: 56px 0 16px;
  font-size: 24px;
  font-weight: 600;
`;
const List = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  margin-bottom: 80px;
`;
const Info = styled.div`
  opacity: 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  h4 {
    color: ${props => props.theme.white.lighter};
    text-align: center;
    font-size: 18px;
  }
`;
const Item = styled.div`
  width: 200px;
  height: 200px;
  cursor: pointer;
  transition: .35s;
  &:hover {
    transform: translateY(-12px);
    & > ${Info} {
      transition: inherit;
      opacity: 1;
    }
  }
`;
const Img = styled.div<{ bg: string }>`
  width: 100%;
  height: 100%;
  background: url(${props => props.bg}) no-repeat center / cover;
`;


function Search(){
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data: searchedMovie, isLoading } = useQuery<IGetMoviesResult>(["movie", "searchedMovie"], () => getSearchMovie(keyword));
  const { data: searchedTv } = useQuery<IGetMoviesResult>(["tv", "searchedTv"], () => getSearchTv(keyword));

  const navigate = useNavigate();
  const onBoxClicked = (menuName: string, data: any) => {
    navigate(`/search/${menuName}/${data.id}?keyword=${keyword}`, { state: { data, menuName } });
  }

  const movieMatch = useMatch(`search/:menuName/:id`);
  
  return (
    <>
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <p>Search results for "<b>{keyword}</b>"</p>

          <Title>Movies</Title>
          <List>
            {
              searchedMovie && searchedMovie.results && searchedMovie.results.map((movie) => (
                <Item
                  key={movie.id}
                  onClick={() => onBoxClicked("movie", movie)}
                >
                  {movie.backdrop_path ? (
                    <Img bg={makeImagePath(movie.backdrop_path, "w500")}/>
                  ) : (
                    "Sorry, no image available"
                  )}
                  <Info>
                    <h4>{movie.title}</h4>
                  </Info>
                </Item>
              ))
            }
          </List>

          <Title>Tv Shows</Title>
          <List>
            {
              searchedTv && searchedTv.results && searchedTv.results.map((tv) => (
                <Item
                  key={tv.id}
                  onClick={() => onBoxClicked("tv", tv)}
                >
                  {tv.backdrop_path ? (
                    <Img bg={makeImagePath(tv.backdrop_path, "w500")}/>
                  ) : (
                    "Sorry, no image available"
                  )}
                  <Info>
                    <h4>{tv.name}</h4>
                  </Info>
                </Item>
              ))
            }
          </List>
        </>
      )
    }
    </Wrapper>

    {movieMatch ? (
      <SearchModal
        data={location.state.data}
        menuName={location.state.menuName}
      />
    ) : null}
  </>
    
  )
}

export default Search;