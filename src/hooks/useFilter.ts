import { useEffect, useState } from "react";
import { convertCapToBillions } from "../utils/convertCapToBillions";
import { currencyItemObj } from "../interfaces";

type Props = {
    minMarketCap: number;
    data: currencyItemObj[];
}

export const useFilter = ({minMarketCap, data}: Props) => {
    const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
    const [filteredMarketCapData, setFilteredMarketCapData] = useState<number[]>([]);
    const [filteredMarketCapChangeData, setFilteredMarketCapChangeData] = useState<number[]>([]);

    useEffect(() => {
        const filteredNames: string[] = [];
        const filteredMarketCapArray: number[] = [];
        const filteredMarketCap24Array: number[] = [];
        
        const filteredData: currencyItemObj[] = data.filter(
            (cur: currencyItemObj) => convertCapToBillions(cur.market_cap) >= minMarketCap
        );
        filteredData.map((cur: currencyItemObj) => {
            filteredNames.push(cur.name)
            filteredMarketCapArray.push(convertCapToBillions(cur.market_cap))
            filteredMarketCap24Array.push(convertCapToBillions(cur.market_cap_change_24h))
        });
        setFilteredCategories(filteredNames)
        setFilteredMarketCapData(filteredMarketCapArray)
        setFilteredMarketCapChangeData(filteredMarketCap24Array)

    }, [data, minMarketCap]);

    return {filteredCategories, filteredMarketCapData, filteredMarketCapChangeData};
};