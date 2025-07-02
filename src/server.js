require('dotenv').config();
const express = require('express')
const app = express()
// const path = require('path');
const configViewEngine = require('./config/viewEngine');
const port = process.env.PORT || 8888;
const hostname = process.env.HOSTNAME;
const webRoutes = require('./routes/web');
const connection = require('./config/database');

// //config req.body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodiess

console.log("check env: ", process.env);

const mysql = require('mysql2');
const { table } = require('console');

// config template engine
configViewEngine(app);



//khai báo route
app.use('/', webRoutes);
//app.use('/test', webRoutes);



app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})

// git add.
// git commit - m ""
// git push