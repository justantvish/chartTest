import { useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import { API_URL } from "../../../constants";
import { useFetch } from "../../../hooks/useFetch";
import { useFilter } from "../../../hooks/useFilter";
import { findMaxCap } from "../../../utils/findeMaxCap";

import Tooltip from "../../UI/Tooltip/Tooltip";
import RangeInput from "../../RangeInput/RangeInput";

import classes from './BarChart.module.scss';
import { mergeSort } from "../../../utils/mergeSort";

const BarChart = () => {
    const { data } = useFetch(API_URL);
    const {highestMarketCap, highestMarketCapCurrency, lowestMarketCap} = findMaxCap(data);

    const [minMarketCap, setminMarketCap] = useState<number>(lowestMarketCap);

    const {filteredCategories, filteredMarketCapData, filteredMarketCapChangeData} = useFilter({minMarketCap, data});

    const chartOptions: ApexOptions = {
        annotations: {
            points: [
                {
                    x: highestMarketCapCurrency,
                    y: highestMarketCap,
                    seriesIndex: 0,
                    marker: {
                        size: 6,
                        fillColor: "#00cccc",
                        strokeColor: "#006666",
                        radius: 2
                    },
                    label: {
                        borderColor: "#00cccc",
                        offsetY: 0,
                        style: {
                            color: "#006666",
                            background: "#00cccc",
                            fontSize: '12',
                            fontWeight: 'bold'
                        },
                        text: 'Highest Market Cap'
                    }
                }
            ]
        },
        colors: ['#fabfbf', '#797878'],
        chart: {
            type: 'bar',
            height: 400
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
            categories: [...filteredCategories],
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
    };


    const series = [
        {
            name: 'Market Cap',
            data:[...filteredMarketCapData],
        }, {
            name: 'Market Cap change (24h)',
            data: [...filteredMarketCapChangeData],
        },
    ];
    
    const sortedMarketCapData = mergeSort(filteredMarketCapData)
    const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setminMarketCap(prev => +prev + +sortedMarketCapData[0]);
    };

    return (
        <div id="barChart" className={classes.chart}>
            <RangeInput
                name="marketCapRange"
                label="Market Cap Range (in billion USD)"
                minValue={lowestMarketCap}
                maxValue={highestMarketCap}
                value={lowestMarketCap}
                step={sortedMarketCapData[0]}
                onChange={(e) => handleRangeChange(e)}
            />
            <ReactApexChart 
                options={chartOptions}
                series={series}
                type="bar"
                height={350}
            />
        </div>
    );
};

export default BarChart;