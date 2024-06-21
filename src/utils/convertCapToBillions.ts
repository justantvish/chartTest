export const convertCapToBillions = (currencyCap: number) => {
    return Number((currencyCap / 1000000000).toFixed(2));
};