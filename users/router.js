const {
    BasicStrategy
} = require('passport-http');
const express = require('express');
const jsonParser = require('body-parser').json();
const passport = require('passport');

const {
    User
} = require('./models');

const UsersRouter = express.Router();

UsersRouter.use(jsonParser);


const strategy = new BasicStrategy(
    (email, password, cb) => {
        User
            .findOne({
                email
            })
            .exec()
            .then(user => {
                if (!user) {
                    return cb(null, false, {
                        message: 'Incorrect email'
                    });
                }
                if (user.password !== password) {
                    return cb(null, false, 'Incorrect password');
                }
                return cb(null, user);
            })
            .catch(err => cb(err));
    });

passport.use(strategy);


UsersRouter.post('/', (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: 'No request body'
        });
    }

    if (!('email' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: email'
        });
    }

    let {
        email,
        password,
        firstName,
        lastName
    } = req.body;

    if (typeof email !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: email'
        });
    }

    email = email.trim();

    if (email === '') {
        return res.status(422).json({
            message: 'Incorrect field length: email'
        });
    }

    if (!(password)) {
        return res.status(422).json({
            message: 'Missing field: password'
        });
    }

    if (typeof password !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: password'
        });
    }

    password = password.trim();

    if (password === '') {
        return res.status(422).json({
            message: 'Incorrect field length: password'
        });
    }

    // check for existing user
    return User
        .find({
            email
        })
        .count()
        .exec()
        .then(count => {
            if (count > 0) {
                return res.status(422).json({
                    message: 'email already taken'
                });
            }
            // if no existing user, hash password
            return User.hashPassword(password);
        })
        .then(hash => {
            return User
                .create({
                    email: email,
                    password: hash,
                    firstName: firstName,
                    lastName: lastName
                });
        })
        .then(user => {
            return res.status(201).json(user.apiRepr());
        })
        .catch(err => {
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

// never expose all your users like below in a prod application
// we're just doing this so we have a quick way to see
// if we're creating users. keep in mind, you can also
// verify this in the Mongo shell.
UsersRouter.get('/', (req, res) => {
    return User
        .find()
        .exec()
        .then(users => res.json(users.map(user => user.apiRepr())))
        .catch(err => console.log(err) && res.status(500).json({
            message: 'Internal server error'
        }));
});

// update user information
LocalStrategy = require('passport-local').Strategy;

UsersRouter.put('/:id', jsonParser, function(req, res) {

    User.find(function(err, items) {
        if (err) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }
        User.update({
            id: req.body.id
        }, {
            $set: {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }
        }, function() {
            res.status(201).json(items);
        });
    });
});

// delete user account
UsersRouter.delete('/:id', function(req, res) {
    console.log(req.params.id);
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if (err)
            return res.status(404).json({
                message: 'User not found.'
            });
        res.status(201).json(user);
    });
});

// NB: at time of writing, passport uses callbacks, not promises
const basicStrategy = new BasicStrategy(function(email, password, callback) {
    let user;
    User
        .findOne({
            email: email
        })
        .exec()
        .then(_user => {
            user = _user;
            if (!user) {
                return callback(null, false, {
                    message: 'Incorrect email'
                });
            }
            return user.validatePassword(password);
        })
        .then(isValid => {
            if (!isValid) {
                return callback(null, false, {
                    message: 'Incorrect password'
                });
            } else {
                return callback(null, user);
            }
        });
});


passport.use(basicStrategy);
UsersRouter.use(passport.initialize());

module.exports = {
    UsersRouter
};
