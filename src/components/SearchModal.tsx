import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
interface ISearch {
  data: {
    backdrop_path: string;
    poster_path: string;
    id: number;
    overview: string;
    release_date?: string;
    first_air_date?: string;
    title?: string;
    name?: string;
  } | null;
  menuName: string;
}

function SearchModal({ data, menuName }: ISearch){
  const navigate = useNavigate();
  const onOverlayClick = () => {
    navigate("/search");
  }

  return (
    <Overlay
      onClick={onOverlayClick}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Modal>
        {data ? (
          <>
          <ModalImg style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${makeImagePath(data.backdrop_path, "w500" )})`
          }} />
          <ModalDetail>
            <Poster style={{ background: `url(${makeImagePath(data.poster_path, "w500" )}) no-repeat center / contain`}} />
            <Info>
              {menuName === 'tv' ? (
                <h3>{data.name} ({data.first_air_date?.slice(0, 4)})</h3>
              ) : (
                <h3>{data.title} ({data.release_date?.slice(0, 4)})</h3>
              )}

              <p>{data.overview}</p>
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

export default SearchModal;