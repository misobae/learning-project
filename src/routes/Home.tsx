import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { IGetMoviesResult, getMovies } from "../api/movieApi";
import { makeImagePath } from "../utils";
import { useState } from "react";

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

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  position: absolute;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto : string }>`
  height: 200px;
  background: url(${props => props.bgphoto}) no-repeat center / cover;
  color: red;
  font-size: 50px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  opacity: 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background-color: ${props => props.theme.black.lighter};
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  }
}

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.35,
      duration: 0.3,
      type: "tween",
    }
  },
}

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.35,
      duration: 0.3,
      type: "tween",
    }
  }
}

const offset = 6;

function Home(){
  const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (data){
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex(prev => prev === maxIndex ? 0 : prev + 1);
    }
  };

  const toggleLeaving = () => setLeaving(prev => !prev);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
            >
              <Row
                key={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      key={movie.id}
                      bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      transition={{ type: "tween" }}>
                        {/* 부모 요소에 있는 prop은 자동적으로 자식에게 상속됨 */}
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))
                }
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )
    }
    </Wrapper>
  )
}

export default Home;