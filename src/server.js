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

const multer = require('multer');
// //config req.body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodiess


const mysql = require('mysql2');
const { table } = require('console');

// config template engine
configViewEngine(app);


const { initMiddleware } = require('./middleware/authMiddleware');
initMiddleware(app);

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


// git add.
// git commit - m ""
// git push