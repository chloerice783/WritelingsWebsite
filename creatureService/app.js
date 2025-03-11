const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 9743; 

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
const creatureSchema = new mongoose.Schema({
  creature_rarity: { type: String, required: true },
  creature_amount: { type: Number },
  creature_species: { type: String },
  creature_index: { type: String, default: null },
  creature_image: { type: String, default: null }, //Store file path instead of image data
  creature_description: { type: String, default: null },
});
const MongoCreature = mongoose.model('MongoCreature', creatureSchema);

//Microservice route to fetch all creature data
app.get('/updated-creatures', async (req, res) => {
  try {
      const creatures = await MongoCreature.find();  //Fetch creatures from MongoDB
      res.status(200).json(creatures);  //Send JSON response
  } catch (err) {
      console.error("Error fetching from MongoDB:", err);
      res.status(500).json({ error: "Error fetching data." });
  }
});

//Microservice route to give the user a randomized creature
app.post('/randomize-creature', async (req, res) => {

  const  {creature_index}  = req.body;
  try {
      const creature = await MongoCreature.findOne({ creature_index });  //Fetch creatures from MongoDB
      if (!creature) {
        return res.status(404).json({ error: "No creature found for the given index." });
       }

       
      creature.creature_amount += 1;
      await creature.save();
      res.status(200).json(creature);  //Send JSON response
  } catch (err) {
      console.error("Error fetching creature from MongoDB:", err);
      res.status(500).json({ error: "Error fetching creature data." });
  }
});

app.listen(PORT, function() {
  console.log('Server running on http://localhost:' + PORT);
});

