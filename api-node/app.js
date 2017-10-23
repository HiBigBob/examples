const express         = require('express');
const path            = require('path');
const logger          = require('morgan');
const bodyParser      = require('body-parser');
const mongoose        = require('mongoose');
const jwt             = require('jwt-simple');
const cors            = require('cors');

const config          = require('./app/config/config');
const db              = require('./app/config/db');
const app             = express();
app.set('jwtTokenSecret', config.secret);
app.set('port', config.port);

if (process.env.NODE_ENV !== 'test') {
    db.connect(function() {
        console.log('Connected');
    });
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.options('*', cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers, Origin, X-Requested-With, Content-Type, Accept, x-access-token, Authorization");
    next();
});

const routing = require('./app/config/routing')
routing.set(app);

const server = app.listen(app.get('port'), function () {
    const port = server.address().port;
    console.log('App listening at port %s', port);
});

module.exports = server;
