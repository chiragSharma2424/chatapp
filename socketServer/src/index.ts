// we are creating our own websocket server
// 2 lines of code start the websocket server

import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket,
    room: String
}

let userCount = 0;
let allSockets: User[] = [];



wss.on('connection', (socket) => {
    // @ts-ignore
    socket.on('message', (msg) => {
        const pasrsedMessage = JSON.parse(msg as unknown as string);
        if(pasrsedMessage.type === 'join') {
            allSockets.push({
                socket,
                room: pasrsedMessage.payload.roomId
            })
        }

        // checking the room of user
        if(pasrsedMessage.type === 'chat') {
            let currentUserRoom = null;
            for(let i = 0; i < allSockets.length; i++) {
                if(allSockets[i]?.socket === socket) {
                    currentUserRoom = allSockets[i]?.room
                }
            }

            // sending the message to all pepople of room
            for(let i = 0; i < allSockets.length; i++) {
                if(allSockets[i]?.room === currentUserRoom) {
                    allSockets[i]?.socket.send(pasrsedMessage.payload.message)
                }
            }
        }
    })
});