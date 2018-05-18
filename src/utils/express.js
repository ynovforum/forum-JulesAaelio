const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const SECRET = process.env.COOKIE_SECRET;

const app = new express();
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser(SECRET));

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}));

module.exports = app;