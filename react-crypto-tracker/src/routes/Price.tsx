import { useQuery } from "react-query";
import styled from 'styled-components';
import { fetchCoinTickers } from '../api';

interface ITickers {
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
interface PriceProps {
  coinId: string;
}

const Wrapper = styled.div`
  margin-top: 32px;
`;
const Box = styled.div`
  padding: 24px 0 16px;
  border-bottom: 1px solid #ddd;
  text-align: center;
`;
const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const FlexBoxItem = styled(Box)`
  flex: 48% 0 0;
`;
const Title = styled.strong`
  display: block;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
`;
const TextSmall = styled.p`
  font-size: 14px;
  line-height: 1.4;
`;
const TextLarge = styled.p`
  font-size: 32px;
  font-weight: 600;
  line-height: 1.4;
`;

function Price({ coinId }: PriceProps){
  const {isLoading, data} = useQuery<ITickers>(["price", coinId], () => fetchCoinTickers(coinId));

  // 날짜 문자열을 파싱하여 Date 객체로 변환
  const parseDate = (dateString?: string): Date | undefined => {
    return dateString ? new Date(dateString) : undefined;
  };

  return (
    <div>
      {
      isLoading ? (
        "Loading..."
        ) : (
        <Wrapper>
          <Box>
            <Title>Achieving the highest price!</Title>
            <TextSmall>{parseDate(data?.quotes.USD.ath_date)?.toLocaleString()}</TextSmall>
            <TextLarge>${data?.quotes.USD.ath_price.toFixed(2)}</TextLarge>
          </Box>
          <FlexBox>
            <FlexBoxItem>
              <Title>1 Year Change</Title>
              <TextLarge>{data?.quotes.USD.percent_change_1y}%</TextLarge>
            </FlexBoxItem>
            <FlexBoxItem>
              <Title>1 Month Change</Title>
              <TextLarge>{data?.quotes.USD.percent_change_30d}%</TextLarge>
            </FlexBoxItem>
          </FlexBox>
          <FlexBox>
            <FlexBoxItem>
              <Title>7 Days Change</Title>
              <TextLarge>{data?.quotes.USD.percent_change_7d}%</TextLarge>
            </FlexBoxItem>
            <FlexBoxItem>
              <Title>24 Hours Change</Title>
              <TextLarge>{data?.quotes.USD.percent_change_24h}%</TextLarge>
            </FlexBoxItem>
          </FlexBox>
          
        </Wrapper>
        )
      }
    </div>
  );
}


export default Price;