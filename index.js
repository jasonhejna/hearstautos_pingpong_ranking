var express = require('express')
var app = express()

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
// Connection URL
var mongoUrl = 'mongodb://localhost:27017/ranking';
var mongodb;
MongoClient.connect(mongoUrl, function(err, db) {
  mongodb = db;
  assert.equal(null, err);
  console.log("Connected correctly to server");
});

var requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.use(express.static('public'))

app.get('/test1', function (req, res) {
  var responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send(responseText)
})

app.get('/api/mongo', function (req, res) {
  var responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send(responseText)
  mongodb.collection('users').findOne({'name':'Jason'}).then((result, err)=>{
    console.log(result)
  })
})

app.get('/api/create_tournament_create_root_user', function (req, res) {
  var responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send(responseText)
  var newUser = {
    'name':'Jason',
    'email': 'jason.hejna@gmail',
    'inEmailCode': '123445',
    'browserAuth': '12345'
  }
  mongodb.collection('africabombata').insertOne(newUser).then((result, err)=>{
    //console.log(result)
  })
})

app.listen(3000)
