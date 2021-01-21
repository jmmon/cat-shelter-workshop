var express = require('express');
var router = express.Router();
var fs = require('fs');
const cats = require('../data/cats.json');
const breedsImport = require('../data/breeds.json');

/* GET edit-cat page. */
router.get('/:uid', function(req, res, next) {
    //console.log('~req', req);
    //console.log('~res', res);
    let id = req.params.uid;
    console.log('uid', id);
    console.log(cats);
    console.log(breedsImport);


    let thisCat = cats.find((cat) => {
        //console.log('a single cat', cat.id);
        return cat.id === req.params.uid;
    });

    console.log('thisCat', thisCat);
    let breeds = [];
    // console.log(typeof breeds);
    breedsImport.forEach(b => {
        breeds.push({
            breed: b,
            selected: (b==thisCat.breed) ? true : false
        })
    })
    
    res.render('edit-cat', { thisCat: thisCat, catBreeds: breeds });
});

router.post('/:uid', function(req, res, next) {

});

module.exports = router;
