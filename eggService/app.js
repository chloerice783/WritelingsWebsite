const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 9744; 

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
const eggSchema = new mongoose.Schema({
  egg_rarity: { type: String, required: true },
  egg_index: { type: String, default: null },
  egg_image: { type: String, default: null }, //Store file path instead of image data
});
const MongoEgg = mongoose.model('MongoEgg', eggSchema);

//Microservice route to fetch all egg data
app.get('/updated-eggs', async (req, res) => {
  try {
      const eggs= await MongoEgg.find();  //Fetch creatures from MongoDB
      res.status(200).json(eggs);  //Send JSON response
  } catch (err) {
      console.error("Error fetching from MongoDB:", err);
      res.status(500).json({ error: "Error fetching data." });
  }
});

//Add the mew egg into the database
app.post('/add-egg', async (req, res) => {
    const { egg_index, egg_rarity} = req.body;
    var egg_image = null;
    if (egg_rarity == "common"){
        egg_image = "/eggImages/commonEgg.png"
    }
    else if (egg_rarity == "uncommon"){
        egg_image = "/eggImages/uncommonEgg.png"
    }
    else if (egg_rarity == "rare"){
        egg_image = "/eggImages/rareEgg.png"
    }
    else if (egg_rarity == "legendary"){
        egg_image = "/eggImages/legendaryEgg.png"
    }

    //Create new user
    const egg = new MongoEgg({ egg_rarity, egg_index, egg_image });
    await egg.save();

    res.status(200).json( egg );
});

//Route to handle deleting an egg
app.post('/delete-egg', function(req, res) {
    const egg_id = req.body.egg_id; //Get the updated eggs data from the request body
    
    //Save each text in the MongoDB collection
    MongoEgg.deleteOne({_id: egg_id})
        .then(() => {
            res.status(200).json({ message: "egg deleted successfully!" });
        })
        .catch(err => {
            console.error("Error deleting egg from MongoDB:", err);
            res.status(500).json({ error: "Error deleting egg data." });
        });
});



app.listen(PORT, function() {
  console.log('Server running on http://localhost:' + PORT);
});

