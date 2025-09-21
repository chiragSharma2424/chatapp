// we are creating our own websocket server
// 2 lines of code start the websocket server

import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allSockets: WebSocket[] = [];

wss.on('connection', (socket) => {
    allSockets.push(socket);

    console.log('user connected');
    userCount = userCount + 1;
    console.log(`user count is ${userCount}`);

    socket.on('message', (message) => {
        console.log('message received: ' + message.toString());
        

        // iterating on socket array and brodcasting message to all the clients that are connected
        for(let i = 0; i < allSockets.length; i++) {
            const s = allSockets[i];
            s?.send(message.toString() + ": Sent from server");
        }
    })
});