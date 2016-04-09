'use strict';

var express = require('express');
var router = express.Router();


router.get('/names', function (req, res, next) {
    res.json([{name: 'Peter'}, {name: 'Kurt'}, {name: 'Hanne'}]);
});

router.get('/hellos', function (req, res) {
    res.json([{msg: 'Hello World'}, {msg: 'こんにちは'}, {msg: 'Hello Guys!'}]);
});



module.exports = router;