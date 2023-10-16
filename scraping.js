const puppeteer = require('puppeteer');

async function scrapeData() {
    //Regarde sur Stocktwits stock à prendre
    return 'TTOO';
}

async function dump() {
    //Regarde si dump à l'ouverture
    // fait appel à l'api de yahoo et va regarder si prix à l'ouverture plus bas qu'à 9h50
    return true;
}

async function sentiment() {
    //Regarde si quel est le sentiment sur Stocktwits
    return true;
}

async function tradingVolume() {
    //Regarde trading volume
    // utilise puppeteer mais sur yahooFinance
    return true;
}

async function messageVolume() {
    //Regarde message volume
    return true;
}

module.exports = scrapeData, dump, sentiment, tradingVolume, messageVolume;
