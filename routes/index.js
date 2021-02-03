var express = require('express');
var router = express.Router();
const url = require('url');
const fs = require('fs');
const path = require('path');
const cats = require('../data/cats.json');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(cats);
    res.render('index', { title: 'Browse Cats', cats: cats });
});

module.exports = router;
