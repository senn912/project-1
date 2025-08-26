require('dotenv').config();
const express = require('express')
const app = express()
var mogan = require('morgan');
const session = require('express-session');

// const path = require('path');
const configViewEngine = require('./config/viewEngine');
const port = process.env.PORT || 8888;
const hostname = process.env.HOSTNAME || 'localhost';

const webRoutes = require('./routes/web');
const connection = require('./config/database');
const initAPIRoute = require('./routes/api');
// import cors from "cors";
const cors =  require('cors')

const multer = require('multer');
// //config req.body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodiess


const mysql = require('mysql2');
const { table } = require('console');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// config template engine
configViewEngine(app);


app.use(cors({
  origin: "http://localhost:5173",  
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

const { authMiddleware } = require('./middleware/authMiddleware');
// app.use( authMiddleware);      

//khai báo route
app.use('/', webRoutes);

//init api route
initAPIRoute(app);

app.use((req, res) => {
    return res.render('404.ejs')
});


app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})

// test
// git add.
// git commit - m ""
// git push