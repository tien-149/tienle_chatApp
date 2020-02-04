// // imports always go first - if we're importing anything
// import ChatmMessage from "./modules/ChatMessage.js";
// import ChatMessage from "./modules/ChatMessage.js";

// const socket = io();

// function setUserId({sID, message}) {
//     // debugger;
//     vm.socketID = sID;
// }
// function runDisconnectMessage(packet) {
//     // debugger;
//     console.log(packet);
// }

// function appendNewMessage(msg) {
//     //Take the new comming message and put it into the Vue Instance
//     vm.messages.push(msg);
// }

// //This is our nain Vue instance
// const vm=new Vue({
//     data: {
//         socketID: "",
//         messages: [],
//         message:"",
//         nickName:""
//     },
//     methods: {
//         dispatchMessage() {
//             //emit a message event and send the message to the server
//             console.log('Handle send mesage');
//             socket.emit('chat_message', {
//                 content: this.message,
//                 name: this.nickName || "anonymous"
//             })

//             // this.message=""
//         }
//     },

//     components: {
//         newmessage: ChatMessage //The newMessage can be any name if we want to 
//     },
//     mounted: function(){
//         console.log('mounted');
//     }
// }).$mount("#app");

// //Some event handking -< These events are comming from theh server
// socket.addEventListener('connected', setUserId);
// socket.addEventListener('user_disconnect', runDisconnectMessage);
// socket.addEventListener('new_message', appendNewMessage);

// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js";

const socket = io();

function setUserId({sID, message}) {
    //debugger;
    vm.socketID = sID;
}

function runDisconnectMessage(packet) {
    //debugger;
    console.log(packet);
}

function appendNewMessage(msg) {
    // take the incoming message and push it into the Vue instance 
    // into the messages array
    vm.messages.push(msg);
}

// this is our main Vue instance
const vm = new Vue({
    data: {
        socketID: "",      
        messages: [],
        message: "",
        nickName: ""
    },

    methods: {
        dispatchMessage() {
            // emit a message event and send the message to the server
            console.log('handle send message');

            socket.emit('chat_message', { 
                content: this.message,
                name: this.nickName || "anonymous"
                // || is called a double pipe operator or an "or" operator
                // if this.nickName is set, use it as the value
                // or just make name "anonymous"
            })

            this.message = "";
        }

    },

    components: {
        newmessage: ChatMessage
    },

    mounted: function() {
        console.log('mounted');
    }
}).$mount("#app");


// some event handling -> these events are coming from the server
socket.addEventListener('connected', setUserId);
socket.addEventListener('user_disconnect', runDisconnectMessage);
socket.addEventListener('new_message', appendNewMessage);