import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../slickStyle.css";
import { IGetMoviesResult } from "../api/movieApi";
import { makeImagePath } from "../utils";


// ------ Styled ------ //
const SliderWrap = styled.div`
  position: relative;
  top: -100px;
  margin-bottom: 80px;
`;
const SliderTitle = styled.div`
  margin-left: 24px;
  margin-bottom: 24px;
  color: ${props => props.theme.white.lighter};
  font-size: 32px;
  font-weight: 600;
`;
const Info = styled(motion.div)`
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
const Box = styled(motion.div)<{ bgphoto : string }>`
  position: relative;
  height: 200px;
  background: url(${props => props.bgphoto}) no-repeat center / cover;
  color: red;
  font-size: 50px;
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


// ------ types ------ //
interface SliderProps {
  data: IGetMoviesResult | null;
  title: string;
}


function Carousel({ data, title }: SliderProps) {
  const navigate = useNavigate();
  const onBoxClicked = (movieId:number) => {
    navigate(`movies/${movieId}`);
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
  };

  return(
    <>
      <SliderWrap>
        <SliderTitle>{title}</SliderTitle>
        <Slider {...sliderSettings}>
          {data?.results.map((movie) => (
            <Box
              key={movie.id}
              onClick={() => onBoxClicked(movie.id)}
              bgphoto={makeImagePath(movie.backdrop_path, "w500")}
            >
              <Info>
                <h4>{movie.title}</h4>
              </Info>
            </Box> ))
          }
        </Slider>
      </SliderWrap>
    </>
  )
}

export default Carousel;