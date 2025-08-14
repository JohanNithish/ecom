const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
//import cookieParser from "cookie-parser";

const app = express();

const connectDB = require('./config/connectDB');
dotenv.config({path: path.join(__dirname, 'config', 'config.env')});
app.use(express.json());
connectDB();

const master = require('./routes/master');
const login = require('./routes/login');
app.use(express.json());
app.use(cors());
app.use('/api/v1/',master);
app.use('/api/v1/',login);



app.listen(process.env.PORT, () => {
    console.log(`Server listening to Port ${process.env.PORT} in ${process.env.NODE_ENV}`)
});