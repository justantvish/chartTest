import { renderToStaticMarkup } from "react-dom/server";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import { API_URL } from "../../../constants";
import { currencyItemObj } from "../../../interfaces";

import { fetchResponse, useFetch } from "../../../hooks/useFetch";
import Tooltip from "../../UI/Tooltip/Tooltip";

import classes from './BarChart.module.scss';

const BarChart = () => {
    const {data}: fetchResponse = useFetch(API_URL);
    console.log(data)

    const categories: string[] = [];
    const marketCapData: number[] = [];
    const marketCapChangeData: number[] = [];
        
    data && data.map((cur: currencyItemObj) => {
        categories.push(cur.name)
        marketCapData.push(Number((cur.market_cap / 1000000000).toFixed(2)))
        marketCapChangeData.push(Number((cur.market_cap_change_24h / 1000000000).toFixed(2)))
    });

    const findMaxCap = () => {
        let highestMarketCap: number = 0;
        let highestMarketCapCurrency: string = '';

        for (let i = 0; i < data.length; i++) {
            const current: currencyItemObj = data[i];
            highestMarketCap = Math.max(highestMarketCap, current.market_cap)
            if(current.market_cap === highestMarketCap) {
                highestMarketCapCurrency = current.name
            }
        }
        highestMarketCap = Number((highestMarketCap / 1000000000).toFixed(2))
        return {highestMarketCap, highestMarketCapCurrency};
    }
    const {highestMarketCap, highestMarketCapCurrency} = findMaxCap();
   


    console.log(findMaxCap())

    const chartOptions: ApexOptions = {
        annotations: {
            points: [
                {
                    x: highestMarketCapCurrency,
                    y: highestMarketCap,
                    seriesIndex: 0,
                    marker: {
                        size: 6,
                        fillColor: "#fabfbf",
                        strokeColor: "#363232",
                        radius: 2
                    },
                    label: {
                        borderColor: "#fabfbf",
                        offsetY: 0,
                        style: {
                            color: "#fff",
                            background: "#fabfbf",
                            fontSize: '12'
                        },
                        text: 'Highest Market Cap'
                    }
                }
            ]
        },
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
            text: 'Market Cap (in billion USD)',
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            custom: function({series, seriesIndex, dataPointIndex, w}) {
                const curObj = data.find(item => item['name'] === w.globals.labels[dataPointIndex]);

                if (curObj === undefined) {
                    throw new TypeError('The value was promised to always be there!');
                }
                const imgUrl = curObj['image'];

                return renderToStaticMarkup (
                    <Tooltip imgUrl={imgUrl} title={w.globals.labels[dataPointIndex]}>
                        Market Cap: {series[seriesIndex][dataPointIndex]}
                    </Tooltip>
                );
            },
            intersect: false,
            theme: undefined,
            shared: true,
            y: {
                formatter: function (val) {
                    return `$${val}`
                }
            }
        },
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