const express = require('express');
const bodyParser = require('body-parser')
const router= require("./router/route.js")
const app = express();
const mongoose=require("mongoose")
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const uri = "mongodb://localhost:27017/hts";

mongoose.connect(uri).then(() => {
  console.log('Connected to MongoDB successfully!');
})
.catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
});
app.use('/',router)
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});