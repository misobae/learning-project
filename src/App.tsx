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

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;
  background-color: #FBAB7E;
  background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
`;

const ButtonWrap = styled.div`
  flex-basis: 100%;
  margin-top: 36px;
  text-align: center;
`;

const Button = styled(motion.button)`
  padding: 6px 18px;
  border-radius: 14px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: rgba(255, 255, 255, 0.5);
  border: 0;
  font-size: 18px;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Box = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 32px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 20%);
`

const btnVars = {
  big: {
    scale: 1.15,
    backgroundColor: "#F7CE68"
  },
  small: {
    scale: 1,
    backgroundColor: "#FBAB7E"
  }
}

const boxStyles = [
  { transformOrigin: "bottom right" },
  { transformOrigin: "bottom left" },
  { transformOrigin: "top right" },
  { transformOrigin: "top left" }
];

function App() {
  const [switched, setSwitched] = useState(false);
  const [id, setId] = useState<null | string>(null);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Grid>
          {[1, 2, 3, 4].map((n) => (
            <Box
              key={n}
              layoutId={`${n}`}
              onClick={() => setId(n + "")}
              whileHover={{ scale: 1.1 }}
              style={{ ...boxStyles[n - 1] }}
            >
              {(n === 2) && (
                switched ? <Circle
                  layoutId="circle"
                  style={{ backgroundColor: "#F7CE68" }}
                /> : null
              )}
              {(n === 3) && (
                !switched ? <Circle
                  layoutId="circle"
                  style={{ backgroundColor: "#FBAB7E" }}
                /> : null
              )}
            </Box>
          ))}
        </Grid>
        <AnimatePresence>
          {id ? <Overlay
            onClick={() => setId(null)}
            initial={{backgroundColor: "rgba(0, 0, 0, 0)"}}
            animate={{backgroundColor: "rgba(0, 0, 0, 0.7)"}}
            exit={{backgroundColor: "rgba(0, 0, 0, 0)"}}>
              <Box layoutId={`${id}`} style={{width: 400, height: 300, backgroundColor: "#fff"}} />
            </Overlay> : null}
        </AnimatePresence>
        <ButtonWrap>
          <Button
            onClick={() => setSwitched(prev => !prev)}
            variants={btnVars}
            animate={switched ? "big" : "small"}
            >Switch !</Button>
        </ButtonWrap>
      </Wrapper>
    </>
  );
}

export default App;
