var stock = {
    randomAroundZero: function () {
        return Math.random() - 0.5;
    },

    normalcdf: function (X) {   //HASTINGS.  MAX ERROR = .000001
        const T = 1/(1 + 0.2316419 * Math.abs(X));
        const D = 0.3989423 * Math.exp(-X * X / 2);
        let Prob = D * T * (0.3193815 + T * (-0.3565638 + T * (1.781478 + T * (-1.821256 + T * 1.330274))));
        if (X>0) {
        	Prob = 1 - Prob;
        }
        return Prob;
    },

    getStockPrice: function (stock) {
        const rate = stock["rate"];
        const startingPoint = stock["startingPoint"];
        const sigma = stock["sigma"];

        const norm = (this.normalcdf((this.randomAroundZero() - rate) / sigma)) / 100;

        return Math.round(startingPoint * (1 + norm) * 100) / 100;
    }
};

module.exports = stock;
