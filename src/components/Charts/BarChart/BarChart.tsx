import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { API_URL } from "../../../constants";

import classes from './BarChart.module.scss';
import { fetchResponse, useFetch } from "../../../hooks/useFetch";
import { currencyItemObj } from "../../../interfaces";

const BarChart = () => {
    const {data}: fetchResponse = useFetch(API_URL);
    console.log(data)

const categories: string[] = [];
const marketCapData: number[] = [];
const marketCapChangeData: number[] = [];
    
data && data.map((cur: currencyItemObj) => {
    categories.push(cur.name)
    marketCapData.push(cur.market_cap)
    marketCapChangeData.push(cur.market_cap_change_24h)
})

console.log(marketCapChangeData.map(el => el.toLocaleString()))

const chartOptions: ApexOptions = {
    colors: ['#fabfbf', '#797878'],
    chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '80%',
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: [...categories],
      },
      yaxis: {
        title: {
          text: 'Market Cap ($)',
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        enabled: true,
        intersect: false,
        shared: true,
        y: {
          formatter: function (val) {
            return `$${val}`
          }
        }
    }
}

const series = [
    {
        name: 'Market Cap',
        data: [...marketCapData],
    }, {
        name: 'Market Cap change (24h)',
        data: [...marketCapChangeData],
    },
];

    return (
        <div id="chart" className={classes.chart}>
            <ReactApexChart 
                options={chartOptions}
                series={series}
                type="bar"
                height={350}
            />
        </div>
    )
};

export default BarChart;