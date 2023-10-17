const puppeteer = require('puppeteer');
const {default: yahooStockAPI} = require("yahoo-stock-api");

async function index() {
    //Regarde sur Stocktwits stock à prendre
    return 'TTOO';
}

async function dump() {
    //Regarde si dump à l'ouverture
    // fait appel à l'api de yahoo et va regarder si prix à l'ouverture plus haut qu'à 9h50

    return 0;
}

async function sentiment() {
    console.log("Calculating sentiment ")
    //Regarde quel est le sentiment sur Stocktwits
    const browser = await puppeteer.launch({
        headless: "new",
        defaultViewport: null,
    });
    const page = await browser.newPage();

    try {
        const symbol = await index(); // Get the symbol from the index() function
        const url = `https://stocktwits.com/symbol/${symbol}`;
        await page.goto(url);

        // Use the `page.$$` function to select all elements with the specified class
        const elements = await page.$$('[class*="CommunitySentimentGauge_score__b2yOx"]');


        // Extract text content from all selected elements
        const elementHTML = await elements[0].evaluate(element => element.innerHTML);

        const numericValue = parseInt(elementHTML, 10);

        let sentimentValue = 0;
        if (numericValue > 80){
            sentimentValue = 2;
        }
        console.log("DONE")
        return sentimentValue;


    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await browser.close();
    }




}

async function tradingVolume() {
    console.log("Calculating trading volume")
    // Look for trading volume
    const symbol = await index();
    const yahoo = new yahooStockAPI();
    const startDate = new Date();
    const endDate = new Date();
    const response = await yahoo.getHistoricalPrices({startDate, endDate, symbol, frequency: '1d',});

    // If tradingVolume > then 200000 then value +1
    const tradingVolume = response.response[0].volume;
    let tradingVolumeValue = 0;
    if (tradingVolume > 2000000){
        tradingVolumeValue = 1;
    }

    console.log("DONE")
    return tradingVolumeValue;
}

async function messageVolume() {
    //Regarde message volume
    console.log("Calculating message volume ")
    //Regarde quel est le sentiment sur Stocktwits
    const browser = await puppeteer.launch({
        headless: "new",
        defaultViewport: null,
    });
    const page = await browser.newPage();

    try {
        const symbol = await index(); // Get the symbol from the index() function
        const url = `https://stocktwits.com/symbol/${symbol}`;
        await page.goto(url);

        // Use the `page.$$` function to select all elements with the specified class
        const elements = await page.$$('[class*="CommunitySentimentGauge_score__b2yOx"]');


        // Extract text content from all selected elements
        const elementHTML = await elements[1].evaluate(element => element.innerHTML);

        const numericValue = parseInt(elementHTML, 10);

        let sentimentValue = 0;
        if (numericValue > 80){
            sentimentValue = 2;
        }
        console.log("DONE")
        return sentimentValue;


    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await browser.close();
    }


    return 1;
}

async function dayMonth() {
    console.log("Calculating day of the month")
    //Regarde jour du mois => début du mois mieux
    const today = new Date().getDate();
    let dayMonthValue = 0;
    if (today < 10){
        dayMonthValue = 0.5;
    }
    console.log("DONE")
    return dayMonthValue;
}

async function dayWeek() {
    console.log("Calculating day of the week")
    //Regarde jour de la semaine => vdd dangereux, lundi bien
    const today = new Date().getDay();

    let dayWeekValue = 0;
    if (today > 4){
        dayWeekValue = -0.5;
    }
    console.log("DONE")
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
