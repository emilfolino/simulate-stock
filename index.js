var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var stock = require("./stock.js");


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
    var stocks = {
        "dbwebb": stock.getStockPrice("dbwebb"),
        "DIDD": stock.getStockPrice("DIDD"),
    };

    io.emit("stocks", JSON.stringify(stocks));
}, 1000);


http.listen(8811, function(){
   console.log('listening on *:8811');
});
