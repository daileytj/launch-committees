const express = require('express');
const jsonParser = require('body-parser').json();


const {
    CleanUp
} = require('./models');

const CleanUpRouter = express.Router();

CleanUpRouter.use(jsonParser);

// create new item
CleanUpRouter.post('/', (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: 'No request body'
        });
    }

    if (!('item' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: item'
        });
    }

    let item = req.body.item;
    console.log(item);
    if (typeof item !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: item'
        });
    }

    item = item.trim();

    if (item === '') {
        return res.status(422).json({
            message: 'Incorrect field length: item'
        });
    }

    // check for existing item
    return CleanUp
        .find({
            item
        })
        .count()
        .exec()
        .then(count => {
            if (count > 0) {
                return res.status(422).json({
                    message: 'item already posted'
                });
            }
        })
        .then(hash => {
            return CleanUp
                .create({
                    item: item
                });
        })
        .then(item => {
            return res.status(201).json(item.apiRepr());
        })
        .catch(err => {
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

CleanUpRouter.get('/', (req, res) => {
    return CleanUp
        .find()
        .exec()
        .then(items => res.json(items.map(item => item.apiRepr())))
        .catch(err => console.log(err) && res.status(500).json({
            message: 'Internal server error'
        }));
});

// delete item
CleanUpRouter.delete('/:id', function(req, res) {
    console.log(req.params.id);
    CleanUp.findByIdAndRemove(req.params.id, function(err, item) {
        if (err)
            return res.status(404).json({
                message: 'Item not found.'
            });
        res.status(201).json(item);
    });
});

module.exports = {
    CleanUpRouter
};
