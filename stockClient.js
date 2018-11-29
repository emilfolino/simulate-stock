(function() {
    var socket = io();
    socket.on('stocks', function(msg) {
        console.log(msg)
    });
})();
