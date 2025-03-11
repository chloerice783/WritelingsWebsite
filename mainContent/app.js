const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const app = express();
const PORT = 9741;

//const fetch = require('node-fetch');//for making http requests 

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     //Import express-handlebars
app.set('view engine', 'hbs');                 //Tell express to use the handlebars engine whenever it encounters a *.hbs file.

app.use('/compiledTemplates.js', express.static(path.join(__dirname, 'compiledTemplates.js')));

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded


const hbs = exphbs.create({

    partialsDir: path.join(__dirname, 'views/partials') //Tell Handlebars where to find partials
});

//Set up Handlebars as the view engine
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials')
}))

app.set('views', path.join(__dirname, 'views'));


//Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

//Route for the homepage
app.get('/', function(req, res) {
    res.render('login'); //Renders 'views/index.handlebars' by default
});

//Route for the registration page
app.get('/register', function(req, res) {
    res.render('register'); //Renders 'views/index.handlebars' by default
});

app.get('/writinggallery', function(req, res) {
    fetch('http://localhost:9742/updated-texts')  //get text data from microservice 
        .then(response => response.json())
        .then(textsData => { //textsData contains the retrieved documents
            //Pass data to the template
            res.render('writing-gallery', { texts: textsData });
        })
        .catch(err => {
            console.error("Error fetching from MongoDB microservice:", err);
            res.status(500).send("Error reading data.");
        });
});


app.get('/homepage', function(req, res) {
    res.render('homepage'); 
});

app.get('/help-page', function(req, res) {
    res.render('help-page');
});


//Get creature data from microservice
app.get('/creature-collection', async (req, res) => {
    try {
        const response = await fetch('http://localhost:9743/updated-creatures');

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const creatures = await response.json();
        res.render('creature-collection', { creatures }); 
    } catch (err) {
        console.error("Error fetching from MongoDB microservice:", err);
        if (!res.headersSent) {
            res.status(500).send("Error reading data.");
        }
    }
});


//Get creature data from microservice
app.get('/egg-nursery', async (req, res) => {
    try {
        const response = await fetch('http://localhost:9744/updated-eggs');

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const eggs = await response.json();
        res.render('egg-nursery', { eggs }); 
    } catch (err) {
        console.error("Error fetching from MongoDB microservice:", err);
        if (!res.headersSent) {
            res.status(500).send("Error reading data.");
        }
    }
});

//Route to open a text when the user clicks 'open text' in writing gallery
app.get('/text-page', async function(req, res) {
    const textId = req.query.text_id;

    fetch(`http://localhost:9742/selected-text?textId=${textId}`)  //get text data from microservice 
    .then(response => response.json())
    .then(text => { //textsData contains the retrieved documents
        //Pass data to the template
        res.render('text-page', {
            text_title: text.text_title,
            text_content: text.text_data, 
            word_count: text.word_count,
            word_goal: text.word_goal,
            reward_rarity: text.reward_rarity,
            text_status: text.text_status,
            text_id: textId
        });
    })
    .catch(err => {
        console.error("Error fetching from MongoDB microservice:", err);
        res.status(500).send("Error reading data.");
    });

});

app.listen(PORT, function() {
    console.log('Server running on http://localhost:' + PORT);
});
