import { useState } from 'react';
import { useLocation } from "react-router-dom";
import styled from 'styled-components';

const Container = styled.div `
  max-width: 480px;
  margin: 0 auto;
  padding: 0 24px;
`;
const Header = styled.header `
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;
const Title = styled.h1`
  color: ${props => props.theme.textColor};
  font-size: 48px;
  font-weight: bold;
`;
const Loader = styled.span`
  font-size: 24px;
`;

interface RouteState {
  name: string;
}

function Coin(){
  const [loading, setLoading] = useState(true);
  const { state } = useLocation<RouteState>();
  
  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading ...</Loader> : null}
    </Container>
  )
}

export default Coin;