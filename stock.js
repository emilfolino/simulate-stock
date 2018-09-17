var stock = {
    randomInt: function (min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    },

    getStockPrice: function (stockName) {
        const stocks = {
            "dbwebb": {
                rate: 1.2,
                startingPoint: 2000,
                fluctuations: [-8, 10]
            },
            "DIDD": {
                rate: 1.15,
                startingPoint: 6000,
                fluctuations: [-2, 8]
            }
        };

        var startT = Math.floor(new Date(2018, 8, 17, 14) / 1000)
        var t = Math.floor(new Date() / 1000);
        var rate = stocks[stockName]["rate"];
        var startingPoint = stocks[stockName]["startingPoint"];
        var delta = (t - startT);
        var fluctuation = stock.randomInt(
            stocks[stockName]["fluctuations"][0],
            stocks[stockName]["fluctuations"][1]
        );

        return (rate * delta + startingPoint + fluctuation) / 1000;
    }
};

module.exports = stock;
