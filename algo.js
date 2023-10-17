const scrapeData = require('./scraping');
const yahooStockAPI = require('yahoo-stock-api').default;

async function main() {
    const index = await scrapeData.index();
    const dump = await scrapeData.dump();
    const sentiment = await scrapeData.sentiment();
    const tradingVolume = await scrapeData.tradingVolume();
    const messageVolume = await scrapeData.messageVolume();
    const dayMonth = await scrapeData.dayMonth();
    const dayWeek = await scrapeData.dayWeek();


    const result = processData(index, dump, sentiment, tradingVolume, messageVolume, dayMonth, dayWeek);
    console.log(index + " " + result.decision + " " + result.value);
    //await tradingAlgorithm();
}


function processData(index, dump, sentiment, tradingVolume, messageVolume, dayMonth, dayWeek) {

    const value = dump + sentiment + tradingVolume + messageVolume + dayMonth + dayWeek;

    let decision = "PASS";
    if (value >= 4) {
        decision = "BUY";
    }

    return {decision, value};
}

async function tradingAlgorithm() {
    const symbol = await scrapeData.index();
    // Implement your trading algorithm logic here
    const yahoo = new yahooStockAPI();
    const startDate = new Date();
    const endDate = new Date();


    const response = await yahoo.getHistoricalPrices({startDate, endDate, symbol, frequency: '1d',});

    console.log( symbol + ' Historical Prices:', response.response);
    return response;

}



main();
module.exports = tradingAlgorithm;






