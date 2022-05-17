const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routeUrls = require('./routes/routes') 
const cors = require('cors')

dotenv.config();

const url = "mongodb+srv://admin:5U9QJbnE0xHJZAph@cluster0.nuuqo.mongodb.net/?retryWrites=true&w=majority";

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.connect(url,connectionParams)
  .then( () => {
      console.log('Connected to the database ')
  })
  .catch( (err) => {
      console.error(`Error connecting to the database. n${err}`);
});
app.use(express.json())
app.use(cors())
app.use('/app', routeUrls);
app.listen(4000, () => console.log("Server is up and running"));