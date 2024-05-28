const express = require('express');
const bodyParser = require('body-parser')
const router= require("./router/route.js")
const app = express();
const mongoose=require("mongoose")
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const uri = "mongodb+srv://ShivaniAdimulam:6YVITVtB4JZQZ2Qb@cluster0.vhsq6.mongodb.net/hts?retryWrites=true&w=majority"                       //"mongodb://localhost:27017/hts";

mongoose.connect(uri).then(() => {
  console.log('Connected to MongoDB successfully!');
})
.catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
});
app.use('/',router)
app.get('/',async (req, res) => {
  res.status(200).send('Hello,To check the apis please hit api endpoints(URLs) in postman tool,Thank You!');
})
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});