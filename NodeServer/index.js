'use strict';

import express from 'express';
import * as database from './database/db.js';
import router from './routes/routes.js';
import cors from 'cors';
import { Server } from "socket.io";
import { httpserver } from 'http';

const app = express();
const server = httpserver.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use('/api',router);

app.get('/', (req, res) => {
    res.status(404).send("404 forbidden :(");
})

io.on("connection", (socket) => {
    socket.emit("me", socket.id);
    socket.on("disconnect", ()=> {
        socket.broadcast.emit("callEnded");
    })
    socket.on("CallUser", ({userToCall, signalData, from, name}) => {
        io.to(userToCall).emit("callUser", {signal: signalData, from, name});
    });
    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    })
    
})

server.listen(8080, () => {
    console.log(`Example app listening on port 8080`)
  })