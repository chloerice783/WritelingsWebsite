const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 9742; 

app.use(express.json()); 
app.use(cors()); 

app.use(express.urlencoded({ extended: true }));

//This is for mongodb server 
const dbURI = 'mongodb+srv://chloerice:Imakizawig12@cluster0.xi9ow.mongodb.net/writelingsdb?retryWrites=true&w=majority&appName=Cluster0'

//Connect to MongoDB Atlas
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
  })
  .catch(err => {
    console.log('Error connecting to MongoDB Atlas:', err);
  });

//Schema for a stored text file object in the db
const textSchema = new mongoose.Schema({
    text_title: { type: String, required: true },
    text_status: { type: String, default: 'incomplete' },
    reward_rarity: { type: String },
    word_goal: { type: Number },
    due_date: { type: String, default: null },
    word_count: { type: Number, default: 0 },
    text_data: { type: String, default: null}
});

const MongoText = mongoose.model('MongoText', textSchema);

// Microservice route to fetch all text data
app.get('/updated-texts', function(req, res) {
    MongoText.find()  //this finds all texts in the MongoDB collection
        .then(textsData => {
            res.status(200).json(textsData);  //Send the data as JSON back to the client
        })
        .catch(err => {
            console.error("Error fetching from MongoDB:", err);
            res.status(500).json({ error: "Error fetching data2." });
        });
});


//Microservice route to fetch data from opened text 
app.get('/selected-text', async function(req, res) {
    const textId = req.query.textId; 
    try {
        const text = await MongoText.findById(textId);
        
        if (!text) {
            return res.status(400).json({ message: 'Text could not be found' });
        }

        return res.status(200).json(text)
    } catch (err) {
        console.error('Error fetching text:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//Route to handle saving updated texts data
app.post('/update-texts', function(req, res) {
    const updatedTextsData = req.body.texts; //Get the updated texts data from the request body
    console.log('Received data:', updatedTextsData); //Log received data
    
    //Save each text in the MongoDB collection
    MongoText.insertMany(updatedTextsData)  //This will insert the array of texts into MongoDB
        .then(() => {
            res.status(200).json({ message: "Data saved successfully!" });
        })
        .catch(err => {
            console.error("Error saving to MongoDB:", err);
            res.status(500).json({ error: "Error saving data." });
        });
});

//Route to handle deleting a text
app.post('/delete-text', function(req, res) {
    const text_id = req.body.text_id; //Get the updated texts data from the request body
    
    //Save each text in the MongoDB collection
    MongoText.deleteOne({_id: text_id})
        .then(() => {
            res.status(200).json({ message: "Data deleted successfully!" });
        })
        .catch(err => {
            console.error("Error deleting from MongoDB:", err);
            res.status(500).json({ error: "Error deleting data." });
        });
});


//Route to handle saving the content in a text file
app.post('/save-text', async function(req, res) {
    const { textId, textContent, wordCount, textStatus } = req.body;

    //Check if the text can be found in the DB 
    try{
        const text = await  MongoText.findById(textId);
        if (!text) {
            console.error('Error saving text: text not found');
            return res.status(400).json({ message: 'Text could not be found' });
         }
         console.log('textid was found');

         console.log('awwuuughh ',textStatus )

        text.text_data = textContent;
        text.word_count = wordCount;
        text.text_status = textStatus;
        await text.save();
        return res.status(200).json({ message: 'Text content successfully saved'});

    } catch (err){
        console.error('Error saving text:', err);
        res.status(500).json({ message: 'Internal server error' });
    }

});


app.listen(PORT, function() {
    console.log('Server running on http://localhost:' + PORT);
});