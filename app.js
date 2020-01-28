var express = require('express');
var app = express();

const io = require('socket.io')(); //Instantiate the socket.io library right away with the () method -< makes it run

//Import hte socker io into library
const port = process.env.PORT || 3030;

// tell express where our static files are (js, images, css etc)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

//This is all of our socket.io messafing functionality

//attack socket.io

io.attach(server);

io.on('connection', function(socket) {
    console.log('user connected');
//Listen for disconnected event
    socket.on('disconnect', function() {
        console.log('a user disconnected');
    })
})