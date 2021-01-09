const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require('../data/breeds.json');
const cats = require('../data/cats.json');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;
    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        //implement logic for showing add-cat html view

        let filepath = path.normalize(
            path.join(__dirname, "../views/addCat.html")
        );

        const index = fs.createReadStream(filepath);

        index.on('data', (data) => {
            let catBreedPlaceholder = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);
            let modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceholder)
            res.write(modifiedData);
        });

        index.on('end', () => {
            res.end();
        });

        index.on('error', (err) => {
            console.log(err);
        });

    } else if (pathname === '/cats/add-breed' && req.method === 'GET') {
        let filepath = path.normalize(
            path.join(__dirname, "../views/addBreed.html")
        );

        const index = fs.createReadStream(filepath);

        index.on('data', (data) => {
            res.write(data);
        });

        index.on('end', () => {
            res.end();
        });

        index.on('error', (err) => {
            console.log(err);
        });
    } else if (pathname === '/cats/add-breed' && req.method === 'POST') {
        console.log('add-breed post path');
        let formData = '';
        
        req.on('data', (data) => {
            formData += data;
        });

        req.on('end', () => {
            console.log('formData:', formData);
            let body = qs.parse(formData);
            console.log(body);

            fs.readFile('./data/breeds.json', (err, data) => {
                if (err) {
                    throw err;
                }

                let breeds = JSON.parse(data);
                breeds.push(body.breed);
                let json = JSON.stringify(breeds);

                fs.writeFile('./data/breeds.json', json, 'utf-8', () => console.log('The breed was uploaded successfully'));

            });

            res.writeHead(302, {
                location: '/'
            });
            res.end();
        });

    } else if (pathname === '/cats/add-cat' && req.method === 'POST') {

        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) throw err;

            let oldPath = files.upload.path;
            let newPath = path.normalize(path.join(globalPath,"/content/images" + files.upload.name));

            fs.rename(oldPath, newPath, (err) => {
                if (err) throw err;
                console.log('files was uploaded successfully');
            });

            fs.readFile('./data/cats.json', 'utf8', (err, data) => {

                let allCats = JSON.parse(data);
                allCats.push({ id:CacheStorage.length = 1, ...fields, image: files.upload.name });
                let json = JSON.stringify(allCats);
                fs.writeFile('./data/cats.json', json, () => {
                    res.writeHead(302, {location: "/"});
                    res.end();
                })
            })
        });

    } else {
        return true; //is request not handled
    }
}