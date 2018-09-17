var stock = {
    randomInt: function (min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    },

    getStockPrice: function () {
        const stocks = {
            "dbwebb": {
                rate: 1.2,
                startingPoint: 20,
                fluctuations: [-8, 10]
            }
        };

        var startT = Math.floor(new Date(2018, 8, 17) / 1000)
        var t = Math.floor(new Date() / 1000);
        var rate = stocks["dbwebb"]["rate"];
        var startingPoint = stocks["dbwebb"]["startingPoint"];
        var delta = t - startT;
        var fluctuation = stock.randomInt(
            stocks["dbwebb"]["fluctuations"][0],
            stocks["dbwebb"]["fluctuations"][1]
        );

        return rate * delta + startingPoint + fluctuation;
    }
};

module.exports = stock;
