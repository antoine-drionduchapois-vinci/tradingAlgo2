const scrapeData = require('./scraping');
const yahooStockAPI = require('yahoo-stock-api').default;

async function tradingAlgorithm() {
    const symbol = await scrapeData();
    // Implement your trading algorithm logic here
    const yahoo = new yahooStockAPI();
    const startDate = new Date('08/21/2020');
    const endDate = new Date('08/26/2020');


    const response = await yahoo.getHistoricalPrices({startDate, endDate, symbol, frequency: '1d',});

    console.log( symbol + ' Historical Prices:', response.response);
    return response;

}


tradingAlgorithm();

module.exports = tradingAlgorithm;






