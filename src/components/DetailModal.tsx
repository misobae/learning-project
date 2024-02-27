import styled from "styled-components";
import { motion } from "framer-motion";
import { IGetMoviesResult } from "../api/movieApi";
import { useNavigate, PathMatch } from "react-router-dom";
import { makeImagePath } from "../utils";

// ------ Styled ------ //
const Overlay = styled(motion.div)`
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 100;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Modal = styled(motion.div)`
  overflow-y: scroll;
  width: 600px;
  max-height: 600px;
  margin: auto;
  background-color: #000;
`;
const ModalImg = styled.img`
  display: block;
  width: 100%;
  height: 0;
  padding-bottom: 50%;
  background-size: cover;
  background-position: center;
`;
const ModalDetail = styled.div`
  display: flex;
  margin-top: -24px;
  padding: 0 24px 48px;
`;
const Poster = styled.img`
  flex: 38% 0 0;
  height: 0;
  padding-top: 57%;
  margin-right: 24px;
`;
const Info = styled.div`
  h3 {
    margin: 8px 0 16px;
    font-size: 28px;
    font-weight: 500;
  }
`;

// ------ interface ------ //
interface DetailProps {
  data: IGetMoviesResult | null;
  movieId: number;
  movieMatch: PathMatch<string> | null;
  category: string;
}

function DetailModal({ data, movieId, movieMatch, category }: DetailProps){
  const navigate = useNavigate();
  const onOverlayClick = () => navigate("/");
  const clickedMovie = movieMatch?.params.id && data?.results.find(movie => String(movie.id) === movieMatch.params.id);
  console.log(clickedMovie);

  return (
    <Overlay
      onClick={onOverlayClick}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Modal>
        {clickedMovie ? (
          <>
          <ModalImg style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${makeImagePath(clickedMovie.backdrop_path, "w500" )})`
          }} />
          <ModalDetail>
            <Poster style={{ background: `url(${makeImagePath(clickedMovie.poster_path, "w500" )}) no-repeat center / contain`}} />
            <Info>
              <h3>{clickedMovie.title} ({clickedMovie.release_date.slice(0, 4)})</h3>
              <p>{clickedMovie.overview}</p>
            </Info>
          </ModalDetail>
          </>
        ) : (
          "Sorry, no information available"
        )}
      </Modal>
    </Overlay>
  )
}

export default DetailModal;