var express = require('express');
var router = express.Router();
const url = require('url');
const fs = require('fs');
const path = require('path');
const cats = require('../data/cats.json');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('search get');
    let searchText = req.query.search;
    console.log('search text:', searchText);


    let filteredCats = cats.filter(cat => cat.name.includes(searchText));
    res.render('search', { cats: filteredCats });
});

module.exports = router;
