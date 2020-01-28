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
    socket.emit('connected', { sID: `${socket.id}`, message: 'new connection'});

    //listen for an upcoming message from a user socket refers to an individual user
    //msg is the incomming message from that user

    socket.on('chat_message', function(msg) {
        console.log(msg);
        //When we get the new message, send it to everyone so they can see it
        // io is the switchbord operator making sre everyone whhoS connected
        //gets the message
        io.emit('new_message', { id: socket.id, message: msg })
    })
//Listen for disconnected event
    socket.on('disconnect', function() {
        console.log('a user disconnected');
        message = `${socket.id}  has left the chat`;
        io.emit('user_disconnect', message);
    })
})