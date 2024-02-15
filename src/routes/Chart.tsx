import { useQuery } from "react-query";
import { fetchCoinHistory } from '../api';
import ApexCharts from "react-apexcharts";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}
function Chart({ coinId }: ChartProps){
  const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId),
  {
    refetchInterval: 5000,
  });

  return (
    <div>
      {
      isLoading ? (
        "Loading..."
      ) : (
      <ApexCharts
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map(price => Number(price.close)) ?? [],
            }
          ]} 
          options={{
            theme: { mode: "dark" },
            chart: {
              height: 500,
              width: 500,
              background: "transparent",
              toolbar: { show: false }
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            grid: { show: false },
            yaxis: { show: false },
            xaxis: {
              axisTicks: { show: false },
              axisBorder: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map(price => new Date(price.time_close * 1000).toUTCString()),
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#0be881"],
                stops: [0, 100]
              }
            },
             colors: ["#0fbcf9"],
             tooltip: {
              y: {
                formatter: (value) => `${value.toFixed(2)}`
              }
             }
          }}
        />
      )
    }
    </div>
  )
}

export default Chart;