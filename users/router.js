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
                // if (user.password !== password) {
                //     return cb(null, false, 'Incorrect password');
                // }
                // return cb(null, user);
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
        lastName,
        committeesServed,
        lead,
        member,
        phoneNumber,
        newToLaunch
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

    // if (!(password)) {
    //     return res.status(422).json({
    //         message: 'Missing field: password'
    //     });
    // }
    //
    // if (typeof password !== 'string') {
    //     return res.status(422).json({
    //         message: 'Incorrect field type: password'
    //     });
    // }

    // password = password.trim();
    //
    // if (password === '') {
    //     return res.status(422).json({
    //         message: 'Incorrect field length: password'
    //     });
    // }

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
            // return User.hashPassword(password);
        })
        .then(hash => {
            return User
                .create({
                    email: email,
                    // password: hash,
                    firstName: firstName,
                    lastName: lastName,
                    committeesServed: committeesServed,
                    lead: lead,
                    member: member,
                    phoneNumber: phoneNumber,
                    newToLaunch: newToLaunch
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

// get for committee members

UsersRouter.get('/:committeesServed', jsonParser, (req, res) => {
    return User
        .find({
            committeesServed: req.params.committeesServed
        })
        .exec()
        .then(users => res.json(users.map(user => user.apiRepr())))
        .catch(err => console.log(err) && res.status(500).json({
            message: 'Internal server error'
        }));
});

// update user information
UsersRouter.put('/:id', jsonParser, function(req, res) {

    User.find(function(err, users) {
        if (err) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }
        //console.(req.params.id, "----", req.body.email, req.body.firstName, req.body.lastName, req.body.committeesServed, req.body.lead, req.body.member, req.body.phoneNumber, req.body.newToLaunch);
        //fix me - post updating empty fields to null

        User.update({
                _id: req.params.id
            }, {
                $set: {
                    email: req.body.email,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    committeesServed: req.body.committeesServed,
                    lead: req.body.lead,
                    member: req.body.member,
                    phoneNumber: req.body.phoneNumber,
                    newToLaunch: req.body.newToLaunch
                }
            },
            function(err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                    //res.send(err);
                } else if (result) {
                    console.log("result", result);
                    res.status(200).json("user updated");
                }
            }
        );
    });
});


// delete user account
UsersRouter.delete('/:id', function(req, res) {
    // console.log(req.params.id);
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
