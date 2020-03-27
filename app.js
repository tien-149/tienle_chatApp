var express = require('express');
var app = express();

// add socket here
const io = require('socket.io')();

const port = process.env.PORT || 3030;

// tell express where our static files are (js, images, css etc)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});
let userList = [];
// attach our chat server to our app
io.attach(server);

io.on('connection', function(socket) { // socket is your connection
    console.log('a user has connected');
    userList.push(socket.id)

    socket.emit("connected", { sID: `${socket.id}`, message: "new connection" });
    io.emit('updateList', userList);

    io.emit("user_connected", `${socket.id} has joined the chat`);
    socket.on('chat_message', function(msg) {
        console.log(this); // let's see what the payload is from the client side

        // tell the connection manager (io) to send this message to everyone
        // anyone connected to our chat app will get this message (including the sender)
        io.emit('new_message', { id: socket.id, message: msg });
    })

    socket.on('disconnect', function() {
        console.log('a user has disconnected');
        message = `${socket.id} has left the chat`;
        io.emit("user_disconnect", message);
    })
})