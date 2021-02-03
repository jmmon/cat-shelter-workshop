var express = require('express');
var router = express.Router();
var fs = require('fs');

const formidable = require('formidable');
const path = require('path');

const breeds = require('../data/breeds.json');
const cats = require('../data/cats.json');
const catsPath = './data/cats.json';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('add-cat', { title: 'Add Cat form', catBreeds: breeds });
});

router.post('/', (req, res, next) => {
    //do something

    console.log('add-cat post path');
    // console.log('~req.body', req.body);
    // console.log('~res', res);
    // console.log(req.body);
    let form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (err) throw err;
        //console.log('~fields:', fields);
        //console.log('~files:', files);

        let oldPath = files.upload.path;    //
        let newPath = path.normalize(path.join(__dirname, "../public/images/" + files.upload.name));
        console.log('old path:', oldPath);
        console.log('new path:', newPath);
        
        let newId = oldPath.match(/[\A-Za-z0-9]+$/g)[0];
        console.log('id:', newId);
        
        fs.rename(oldPath, newPath, (err) => {
            if (err) throw err;
            console.log('files was uploaded successfully');
        });

        fs.readFile(catsPath, 'utf-8', (err, data) => {
            if (err) throw err;
            
            cats.push({ id:newId, ...fields, image: files.upload.name });
            let json = JSON.stringify(cats);
            
            fs.writeFile(catsPath, json, (err) => {
                if (err) throw err;
                console.log('Cat added!');
                res.redirect('/');
            });
        });
    });
});

module.exports = router;
