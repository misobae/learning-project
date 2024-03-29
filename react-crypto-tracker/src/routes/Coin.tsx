import {
  Switch,
  Route,
  Link,
  useLocation,
  useParams,
  useRouteMatch
} from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from 'react-query';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import styled from 'styled-components';

import Price from './Price';
import Chart from './Chart';

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
  margin: 0 auto;
  color: ${props => props.theme.textColor};
  font-size: 48px;
  font-weight: bold;
`;
const Loader = styled.span`
  font-size: 24px;
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  background-color: ${props => props.theme.textColor};
  border-radius: 16px;
`;
const OverviewItem = styled.div`
  text-align: center;
  span {
    display: block;
    color: ${props => props.theme.bgColor};
    &:first-child {
      margin-bottom: 4px;
    }
  }
`;
const Description = styled.p`
  margin: 24px 0;
  line-height: 1.2;
`;
const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 48px;
`;
const Tab = styled.div<{ isactive:boolean }>`
  flex: 48% 0 0;
  text-align: center;
  a {
    display: block;
    background-color: ${props => props.isactive ? props.theme.accentColor : props.theme.textColor};
    padding: 16px;
    border-radius: 16px;
    color: ${props => props.theme.bgColor};
    font-size: 20px;
    transition: background-color .3s;
    &:hover {
      background-color: ${props => props.theme.accentColor};
    }
  }
`;
const BtnBack = styled.div`
  transition: transform .25s;
  &:hover {
   transform : translateX(-6px);
  }
  a {
    font-size: 40px;
  }
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
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));
  const { isLoading: tickerLoading, data: tickersData } = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId));

  const loading = infoLoading || tickerLoading;
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <BtnBack>
          <Link to={{pathname: `/`}}>&larr;</Link>
        </BtnBack>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}  
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading ...</Loader>
        ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isactive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isactive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price coinId={coinId} />
            </Route>
            <Route path={`/${coinId}/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
        )
      }
    </Container>
  )
}

export default Coin;