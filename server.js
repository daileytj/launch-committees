/* STEP 1 - load external resources*/
//for express
var express = require('express');
var bodyParser = require('body-parser');
var events = require('events');
var path = require('path');

//for the db
var mongoose = require('mongoose');
var config = require('./config');
// var Product = require('./models/product');

//for api
// var unirest = require('unirest');

//for auth
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local');
var bcrypt = require('bcryptjs');
var methodOverride = require('method-override');

//import router for users
const {
    UsersRouter
} = require('./users/router');
//import router for CleanUp
const {
    CleanUpRouter
} = require('./clean_up_assignment_list/router');
//import router for SetUp
const {
    SetUpRouter
} = require('./set_up_assignment_list/router');

/* STEP 2 - initialize the app*/
var app = express();

// use router for users api call
app.use('/users', UsersRouter);
// use router for cleanuplist api call
app.use('/clean_up_assignment_list', CleanUpRouter);
// use router for cleanuplist api call
app.use('/set_up_assignment_list', SetUpRouter);

// serves static files and uses json bodyparser
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());

app.use(cookieParser());
app.use(expressSession({
    secret: 'secret123',
    resave: true,
    saveUninitialized: true,
    activeDuration: 5 * 60 * 1000
}));

// To do local authentication below lines are mandatory
app.use(passport.initialize());
app.use(passport.session());



let server;
var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

// if (require.main === module) {
//   runServer().catch(err => console.error(err));
// }


//module.exports = {app, runServer, closeServer};
exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;
