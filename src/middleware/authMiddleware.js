const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
var appRoot = require('app-root-path');
const multer = require('multer');

const initMiddleware = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(morgan('combined'));

    app.use(session({
        secret: 'secret_key',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    }));

    app.use((req, res, next) => {
        res.locals.user = req.session.user || null;
        console.log('res.locals.user = ', res.locals.user);
        next();
    });
};



module.exports = { 
    initMiddleware, 
};
