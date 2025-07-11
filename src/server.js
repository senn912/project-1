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

// app.use((req, res, next) => {
//     //check =>return res.send()
//     console.log('>>>> run into my middleware ', req.method)
//     console.log(req.method)
//     next();
// })



const mysql = require('mysql2');
const { table } = require('console');

// config template engine
configViewEngine(app);


app.use(mogan('combined'))

// Gửi session user tới mọi view EJS


app.use(session({
    secret: 'secret_key',         // có thể đặt bí danh bảo mật
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }     // để false nếu không dùng HTTPS
}));
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    console.log('res.locals.user = ', res.locals.user);
    next();
});

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