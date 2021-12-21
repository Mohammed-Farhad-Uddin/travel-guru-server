const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()
app.use(cors())
app.use(bodyParser.json())
require("dotenv").config();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p8xf6.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const Collection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_CollectionNameBooking}`);
  const UserCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_CollectionNameUser}`);

  app.post('/book',(req,res)=>{
    const bookingInfo=req.body
    Collection.insertOne(bookingInfo)
    
  })

  app.post('/loginUser',(req,res)=>{
    const userInfo=req.body
    UserCollection.insertOne(userInfo)
  })

});

app.get('/', function (req, res) {
  res.send('nafiz adha')
})

app.listen(process.env.PORT || 5000,console.log("listen to port 5000"))
