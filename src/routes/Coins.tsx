import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

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
const CoinList = styled.ul `
`;
const Coin = styled.li `
  margin-bottom: 16px;
  border-radius: 24px;
  background-color: ${props => props.theme.textColor};
  color: ${props => props.theme.bgColor};
  font-size: 24px;
  a {
    display: flex;
    align-items: center;
    padding: 24px;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;
const Loader = styled.span`
  font-size: 24px;
`;
const Img = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 12px;
`;

interface CoinInterface {
  id: string,
  name: string,
  symbol:string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

function Coins(){
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCoins = async() => {
      const response = await axios(`https://api.coinpaprika.com/v1/coins`);
      setCoins(response.data.slice(0, 100));
      setLoading(false);
    };
    getCoins();
  }, [])
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {loading ? (
          <Loader>Loading ...</Loader>
        ) : (
          <CoinList>
            {coins.map((coin) => (
              <Coin key={coin.id}>
                <Link
                  to={{
                    pathname: `/${coin.id}`,
                    state: { name: coin.name }
                  }}
                >
                  <Img src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`} />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinList>
        )
      }

    </Container>
  )
}

export default Coins;