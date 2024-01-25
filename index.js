// import the pets array from data.js
const { Console } = require('console');
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8080;
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

// GET - / - returns homepage
app.get('/', (req, res) => {
    // serve up the public folder as static index.html file
res.sendFile(__dirname + '/public/index.html');
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response
res.send(pets);
});

// get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request
    const owner = req.query.owner;
    console.log(`This is my response ${owner}`);
    // find the pet in the pets array
    const pet = pets.find(pet => pet.owner.toLowerCase() === owner);
    // return (pet);
    console.log(`*** ${pets[0].owner}`);
    console.log(`--- ${pet => pet.owner === owner}`);
    console.log(`This is my other response ${pet}`);

    // send the pet as a response
    res.send(pet);
});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    const dogName = req.params.name;
    // console.log(dogName, "\n");

    // find the pet in the pets array
    const pet = pets.find((pet) => {
        return pet.name.toLowerCase() === dogName
    });

    // send the pet as a response
    res.send(pet);
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;