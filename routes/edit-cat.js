var express = require('express');
var router = express.Router();
var fs = require('fs');

const path = require('path');
var formidable = require('formidable');

const cats = require('../data/cats.json');
const breeds = require('../data/breeds.json');
const catsPath = './data/cats.json';

/* GET edit-cat page. */
router.get('/:uid', function(req, res, next) {

    let uid = req.params.uid;
    console.log('uid', uid);
    console.log(cats);
    console.log(breeds);


    let thisCat = cats.find((cat) => {
        //console.log('a single cat', cat.id);
        return cat.id === uid;
    });

    console.log('thisCat', thisCat);

    let breedsSelected = [];
    breeds.forEach(b => {
        breedsSelected.push({
            breed: b,
            selected: (b===thisCat.breed) ? true : false 
        });
    });
    
    res.render('edit-cat', { title: 'Edit Cat form', thisCat: thisCat, catBreeds: breedsSelected });
});

router.post('/:uid', function(req, res, next) {
    console.log('post edit-cat');

    let uid = req.params.uid;
    let form = new formidable.IncomingForm();
    //console.log('~form:', form);

    form.parse(req, (err, fields, files) => {
        if (err) throw err;
        console.log('~fields:', fields);
        console.log('~files:', files);

        let thisCat = cats.find((cat) => {  //find this cat
            return cat.id === uid;
        });

        console.log('thisCata:', thisCat);
        console.log('indexOf', cats.indexOf(thisCat));

        // handle image filefile
        let imageName;
        if (files.upload.name === '' || thisCat.image === files.upload.name) {
            //if same, copy image name from old cat data
            imageName = thisCat.image;

        } else {
            //process new file-name
            imageName = files.upload.name;

            let oldPath = files.upload.path;
            let newPath = path.normalize(path.join(__dirname, "../public/images/" + files.upload.name));
            console.log('old path:', oldPath);
            console.log('new path:', newPath);

            fs.rename(oldPath, newPath, (err) => {
                if (err) throw err;
                console.log('files was uploaded successfully');
            });
        }

        let editedCat = { id:uid, ...fields, image: imageName };
        console.log('updated cat info:', editedCat);

        //overwrite old cat obj with new edited cat obj
        cats[cats.indexOf(thisCat)] = editedCat; 
        console.log('all-cats-edited', cats);
        let json = JSON.stringify(cats);

        fs.writeFile(catsPath, json, (err) => {
            if (err) throw err;
            res.redirect('/');
        });

        
    });
});

module.exports = router;


// dummy data
        // [{"id":"e885c49f78e25e268ee0d16eaccca1ff","name":"1","description":"1","breed":"Unknown Breed","image":"cat-jan-11th.png"},{"id":"f90a1118c17317b17d014a78ed0e9217","name":"2","description":"2","breed":"Unknown Breed2","image":"cat-jan-11th.png"},{"id":"373f6a58fca44701f357590cef8d8e56","name":"3","description":"3","breed":"Unknown Breed3","image":"cat-jan-11th.png"}]