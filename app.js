var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Twitter = require("twitter");

var tweetClient = new Twitter({
    consumer_key: 'X5fiWWOh9RCwpIF3C2nVBJNe1',
    consumer_secret: 'Yc3bOKXYu6KfMhLH65MFf5yps2Glb2CegyRABDxGU3oYqXya5S',
    access_token_key: '252152228-PxAuvKs0Bmp8uqWnx8MCXo50JOSCNzCDbmj6qyWr',
    access_token_secret: 'UPG9kHaNt3q2pg6H6BlQdcCoj9iQpGM9ciewxDoFu7hsh'
  });

port = process.env.PORT || 3005;
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(__dirname + 'node_modules'));

app.get('/',function(req,res,next){
    res.sendFile(__dirname + '/index.html')
})

var messages = [];

// app.post('/message', function(req,res){
    
//     var msgForm = req.body.Form;
//     var msgBody = req.body.Body;
//     console.log(msgBody);
//     messages.push(msgBody);
//     io.emit("messages",msgBody);
//     // res.send(req);
    
// });

client.stream('statuses/filter', {location: '-80.85, 35.1932, -80.80, 35.2541'}, function(stream) {
    stream.on('data', function(event) {
        io.emit("messages",event.text);
      console.log(event && event.text);
    });
   
    stream.on('error', function(error) {
      throw error;
    });
  });

io.on('connection', function(client) {  
    console.log('Client connected...');
    c = client;
    client.on('join', function(data) {
        // console.log(data);
        // messages.forEach(function(m){
        //     client.emit("messages",m);
        // })
        client.emit("messages","Welcome!");
        // client.emit('messages', 'Hello from server');
    })});

server.listen(port);
console.log('api running on ' + port);