const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

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
        res.redirect('/')
    })


})



app.get('/product/:id', (req, res) => {
  productCollection.find({_id: ObjectId(req.params.id)})
  .toArray ( (err, documents) =>{
    res.send(documents[0]);
  })
})


app.patch('/update/:id', (req, res) => {
  collection.updateOne({_id: ObjectId(req.params.id)},
  {
    $set: {price: req.body.price, quantity: req.body.quantity}
  })
  .then (result => {
    res.send(result.modifiedCount > 0)
  })
})

app.delete('/delete/:id', (req, res) =>{
  collection.deleteOne({_id: ObjectId(req.params.id)})
  .then( result => {
    res.send(result.deletedCount > 0);
  })
})
 
 
});


app.listen(4000,()=>console.log('Listening to port 3000'));