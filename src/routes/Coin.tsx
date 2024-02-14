import { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
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
const Loader = styled.span`
  font-size: 24px;
`;
interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin(){
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();

  useEffect(() => {
    const getCoin = async() => {
      const infoData = await axios(`https://api.coinpaprika.com/v1/coins/${coinId}`);

      const priceData = await axios(`https://api.coinpaprika.com/v1/tickers/${coinId}`);

      setInfo(infoData.data);
      setPriceInfo(priceData.data);
      setLoading(false);
    };
    getCoin();
  }, [])
  
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