var express = require('express');
var router = express.Router();
var fs = require('fs');
var qs = require('querystring');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('add-breed', { title: 'Add breed form' });
});

router.post('/', function(req, res, next) {
    //do something

    console.log('add-breed post path');
    console.log('breed input:', req.body.breed);

    fs.readFile('./data/breeds.json', (err,data) => {
        if (err) throw err;

        let breeds = JSON.parse(data);
        console.log(breeds);
        breeds.push(req.body.breed);
        let json = JSON.stringify(breeds);

        fs.writeFile('./data/breeds.json', json, 'utf-8', () => console.log('The breed was uploaded successfully!'));
        res.redirect('/');
    });


});

module.exports = router;
