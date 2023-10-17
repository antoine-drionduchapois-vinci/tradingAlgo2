const puppeteer = require('puppeteer');
const {default: yahooStockAPI} = require("yahoo-stock-api");

async function index() {
    //Regarde sur Stocktwits stock à prendre
    return 'AMZN';
}

async function dump() {
    //Regarde si dump à l'ouverture
    // fait appel à l'api de yahoo et va regarder si prix à l'ouverture plus haut qu'à 9h50
    return 1;
}

async function sentiment() {
    //Regarde quel est le sentiment sur Stocktwits
    return 1;
}

async function tradingVolume() {
    // Look for trading volume
    const symbol = await index();
    const yahoo = new yahooStockAPI();
    const startDate = new Date();
    const endDate = new Date();
    const response = await yahoo.getHistoricalPrices({startDate, endDate, symbol, frequency: '1d',});

    // If tradingVolume > then 100000 then value +1
    const tradingVolume = response.response[0].volume;
    let tradingVolumeValue = 0;
    if (tradingVolume > 2000000){
        tradingVolumeValue = 1;
    }


    return tradingVolumeValue;
}

async function messageVolume() {
    //Regarde message volume
    return 1;
}

async function dayMonth() {
    //Regarde jour du mois => début du mois mieux
    const today = new Date().getDate();
    let dayMonthValue = 0;
    if (today < 10){
        dayMonthValue = 0.5;
    }

    return dayMonthValue;
}

async function dayWeek() {
    //Regarde jour de la semaine => vdd dangereux, lundi bien
    const today = new Date().getDay();

    let dayWeekValue = 0;
    if (today > 4){
        dayWeekValue = -0.5;
    }
    return dayWeekValue;
}

module.exports = {
    index,
    dump,
    sentiment,
    tradingVolume,
    messageVolume,
    dayMonth,
    dayWeek,
};
