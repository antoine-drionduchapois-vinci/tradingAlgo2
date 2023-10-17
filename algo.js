const scrapeData = require('./scraping');


async function main() {

    const index = await scrapeData.index();
    console.log("Calculating value of " + index + " :");
    const dump = await scrapeData.dump();
    const sentiment = await scrapeData.sentiment();
    const tradingVolume = await scrapeData.tradingVolume();
    const messageVolume = await scrapeData.messageVolume();
    const dayMonth = await scrapeData.dayMonth();
    const dayWeek = await scrapeData.dayWeek();


    const result = processData(index, dump, sentiment, tradingVolume, messageVolume, dayMonth, dayWeek);
    console.log(index + " " + result.decision + " " + result.value + "/6");

}


function processData(index, dump, sentiment, tradingVolume, messageVolume, dayMonth, dayWeek) {

    const value = dump + sentiment + tradingVolume + messageVolume + dayMonth + dayWeek;

    let decision = "NO BUY";
    if (value >= 4) {
        decision = "BUY";
    }

    return {decision, value};
}


main().then();







