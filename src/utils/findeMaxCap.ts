import { currencyItemObj } from "../interfaces";
import { convertCapToBillions } from "./convertCapToBillions";

export const findMaxCap = (data: currencyItemObj[]) => {
    let highestMarketCap: number = 0;
    let lowestMarketCap: number = 0;
    let highestMarketCapCurrency: string = '';

    for (let i = 0; i < data.length; i++) {
        const currentCurrency = data[i];
        highestMarketCap = Math.max(highestMarketCap, currentCurrency.market_cap);
        lowestMarketCap = currentCurrency.market_cap;
        lowestMarketCap = Math.min(lowestMarketCap, currentCurrency.market_cap);
        
        if(currentCurrency.market_cap === highestMarketCap) {
            highestMarketCapCurrency = currentCurrency.name;
        }
    }
    highestMarketCap = convertCapToBillions(highestMarketCap);
    lowestMarketCap = convertCapToBillions(lowestMarketCap);

    return {highestMarketCap, highestMarketCapCurrency, lowestMarketCap};
}