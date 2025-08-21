const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql");
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
const register = require('./routes/register');
const wishlist = require('./routes/wishlist');
const cart = require('./routes/cart');
const checkout = require('./routes/checkout');
app.use('/api/v1/',master);
app.use('/api/v1/',login);
app.use('/api/v1/',product);
app.use('/api/v1/',register);
app.use('/api/v1/',wishlist);
app.use('/api/v1/',cart);
app.use('/api/v1/',checkout);
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // GraphiQL playground enabled
  })
);


app.listen(process.env.PORT, () => {
    console.log(`Server listening to Port ${process.env.PORT} in ${process.env.NODE_ENV}`)
});