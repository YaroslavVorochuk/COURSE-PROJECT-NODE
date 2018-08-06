const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Item = require("../models/item");

router.get('/test', (req, res) => {
    res.status(200).json({
        "message" : "Hello world!"
    })
});

router.get('/name', (req, res) => {
    res.status(200).json({
        "Name" : "Yaroslav"
    })
});

router.get('/sname', (req, res) => {
    res.status(200).json({
        "SName" : "Vorochuk"
    })
});

router.get("/all", (req, res) => {
    Item.find({}).then( data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(500).json({"error": error})
    });
});

router.get("/:itemId", (req, res) => {
    const id = req.params.itemId;
    Item.findOne({"_id": id}).then( data => {
        res.status(200).json(data)
    }).catch(error => {
        res.status(500).json({"error": error})
    });
});

router.post('/save', (req, res) => {
    const item = Item({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        imageSrc: req.body.imageSrc,
        price: req.body.price,
    }, {versionKey: false}); 
    item.save().then(result => {
        res.status(200).json({
            "message" : "Successful",
            "item": result
        }).catch(err => {
            res.status(500).json({"error": err})
        })
    })
})

module.exports = router;