const express = require('express');
const jsonParser = require('body-parser').json();


const {
    SetUp
} = require('./models');

const SetUpRouter = express.Router();

SetUpRouter.use(jsonParser);

// create new item
SetUpRouter.post('/', (req, res) => {
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
    return SetUp
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
            return SetUp
                .create({
                    item: item,
                    checked: false
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

SetUpRouter.get('/', (req, res) => {
    return SetUp
        .find()
        .exec()
        .then(items => res.json(items.map(item => item.apiRepr())))
        .catch(err => console.log(err) && res.status(500).json({
            message: 'Internal server error'
        }));
});

// ------------------------------------------------------------

// -                 updating list item check (WIP)

// ------------------------------------------------------------

//

//

// update item
SetUpRouter.put('/:id', jsonParser, function(req, res) {
    console.log("updating item...");
    // console.log(SetUp.find(req.params.id));
    SetUp.find(function(err, item) {
        console.log(item);
        if (err) {
            return res.status(404).json({
                message: 'Item not found.'
            });
        }
        SetUp.update({
                _id: req.params.id
            }, {
                $set: {
                    checked: req.body.checked
                }
            },
            function(err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                    //res.send(err);
                } else if (result) {
                    res.status(201).json("item check status updated");
                }
            });
        //res.status(201).json(items);
        console.log(req.body.checked);
        console.log(req.params.id, " updated");
        console.log("updated items: ", item);
    });
});

// delete item
SetUpRouter.delete('/:id', function(req, res) {
    console.log(req.params.id);
    SetUp.findByIdAndRemove(req.params.id, function(err, item) {
        if (err)
            return res.status(404).json({
                message: 'Item not found.'
            });
        res.status(201).json(item);
    });
});

module.exports = {
    SetUpRouter
};
