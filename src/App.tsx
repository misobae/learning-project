import styled, { createGlobalStyle } from "styled-components";
import {
  motion,
  AnimatePresence
} from "framer-motion";
import { useState } from "react";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
`;

const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #85FFBD;
  background-image: linear-gradient(45deg, rgb(136, 255, 191) 0%, rgb(255, 251, 125) 100%);
`;

const Box = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 100px;
  width: 400px;
  height: 300px;
  background-color: #fff;
  border-radius: 32px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
`;

const sliderVar = {
  entry: (back: boolean) => {
    return {
      x: back ? -500 : 500,
      opacity: 0,
      scale: 0
    }
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (back: boolean) => {
    return {
      x: back ? 500 : -500,
      opacity: 0,
      scale: 0,
      transition: { duration: 1 }
    }
  }
}


function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextPlease = () => {
    setBack(false);
    setVisible((prev) => prev === 9 ? 9 : prev + 1);
  }
  const prevPlease = () => {
    setBack(true);
    setVisible((prev) => prev === 1 ? 1 : prev - 1);
  }
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <AnimatePresence custom={back}>
          <Box
            key={visible}
            custom={back}
            variants={sliderVar}
            initial="entry"
            animate="center"
            exit="exit"
            >
              {visible}
            </Box> 
        </AnimatePresence>
        <button onClick={prevPlease}>Prev</button>
        <button onClick={nextPlease}>Next</button>
      </Wrapper>
    </>
  );
}

export default App;
