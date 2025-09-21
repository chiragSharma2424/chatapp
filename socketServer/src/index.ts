// we are creating our own websocket server
// 2 lines of code start the websocket server

import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;

wss.on('connection', (socket) => {
    console.log('user connected');
    userCount = userCount + 1;
    console.log(`user count is ${userCount}`);

    socket.on('message', (message) => {
        console.log('message received: ' + message.toString());
        setTimeout(() => {
            socket.send(message.toString() + " sent from the server");
        }, 2000);
    })
});