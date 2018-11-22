var app = require('express')();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const stock = require("./stock.js");

var princessTarta = {
    name: "Princesstårta",
    rate: 0.2,
    sigma: 1.8,
    startingPoint: 20,
};

var mandelKubb = {
    name: "Mandel kubb",
    rate: 0.1,
    sigma: 1.5,
    startingPoint: 20,
};

var cakes = [princessTarta, mandelKubb];

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

setInterval(function () {
    cakes.map((cake) => {
        cake["startingPoint"] = stock.getStockPrice(cake);
        return cake;
    });

    console.log(cakes);

    io.emit("stocks", JSON.stringify(cakes));
}, 1000);


http.listen(8811, function(){
   console.log('listening on *:8811');
});
