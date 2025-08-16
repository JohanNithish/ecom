const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

const connectDB = require('./config/connectDB');
dotenv.config({path: path.join(__dirname, 'config', 'config.env')});
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
connectDB();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const master = require('./routes/master');
const login = require('./routes/login');
const product = require('./routes/product');
app.use('/api/v1/',master);
app.use('/api/v1/',login);
app.use('/api/v1/',product);


app.listen(process.env.PORT, () => {
    console.log(`Server listening to Port ${process.env.PORT} in ${process.env.NODE_ENV}`)
});