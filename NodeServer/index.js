'use strict';

import express from 'express';
import * as database from './database/db.js';
import router from './routes/routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { SERVER_PORT } from './constants.js';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use('/api',router);

app.get('/', (req, res) => {
    res.status(404).send("404 forbidden :(");
})

app.listen(SERVER_PORT, ()=>{
    console.log("App is running.")
})