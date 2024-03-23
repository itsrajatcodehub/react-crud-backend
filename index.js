import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import mongoose from 'mongoose';
import http from 'http';
import bodyParser from "body-parser";
import cors from 'cors';
import userRoutes from './routes/userDetailsRoutes.js';

const app = express();
const apiUrl = process.env.APIURL;
const port = process.env.PORT;
const server = http.createServer(app);

mongoose.connect(apiUrl).then(() => {
    console.log("Database Connected Successfully");
}).catch((err) => {
    console.log("Database not connected", err);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', userRoutes);

server.listen(port, () => {
    console.log("Backend running on port:", port);
});
