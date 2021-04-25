const express = require('express');
const MongoClient = require('mongodb').MongoClient;

//  const cors = require('cors');
  const bodyParser = require('body-parser');
const password= "a9usmJkbQQ2IwtlR";
const uri = "mongodb+srv://jannath:a9usmJkbQQ2IwtlR@cluster0.ku9hx.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// username= jannath
const app = express();
// app.use(cors());
 app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));



app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})




client.connect(err => {
  const collection = client.db("organicdb").collection("organic");

  app.get('/product',(req,res)=>{
    collection.find({})
    .toArray((err,documents)=>{
        res.send(documents);
    })
  })



app.post("/addProduct",(req,res)=>{
    const product=req.body;
    collection.insertOne(product)
    .then(result=>{
        console.log('data added successfully');
        res.send('success');
    })


})
 
 
});


app.listen(3000,()=>console.log('Listening to port 3000'));