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
var countUsers = 0;
{locations: '-80.85, 35.1932, -80.80, 35.2541'}
// tweetClient.stream('statuses/filter', {locations: '-80.913815,35.188787,-80.76756,35.274179'}, function(stream) {
//     stream.on('data', function(event) {
//         var message = {}
//         console.log(event.text);
//         if ("media" in event.entities){
//                 message["image"] = event.entities.media[0]["media_url"]
            
//         }
//         message["text"] = event.text
//         // console.log(message);
//         io.emit("messages",message);
//     //   console.log(event && event.text);
//     });
   
//     stream.on('error', function(error) {
//       console.log( error);
//     });
//   });
// var messages = [];
// for (var i =0; i < 100; i++){
//     messages.push("kir");
// }

var stream; 



io.on('connection', function(client) {  
    console.log('Client connected...');
    c = client;
    client.on('join', function(data) {
        countUsers ++
        // console.log(data);
        // messages.forEach(function(m){
        //     client.emit("messages",m);
        // })
            if (countUsers ==1){
                stream = tweetClient.stream('statuses/filter', {locations: '-80.913815,35.188787,-80.76756,35.274179'});

            }
            // console.log(io.sockets.clients());

            stream.on('data', function(event) {
            var message = {}
            // console.log(event.text);
            if ("media" in event.entities){
                    message["image"] = event.entities.media[0]["media_url"]
                
            }
            message["text"] = event.text
            // console.log(message);
            io.emit("messages",message);
                console.log(event && event.text);
            });
    
            stream.on('error', function(error) {
                console.log( error);
             });
    client.on("leave",function(data){
        countUsers--;
        if (countUsers == 0) {
            stream.destroy();
        }
        
        console.log("no stream")
    })
    })});

io.on("disconnect",function(d){
    console.log("disconnected");
})

server.listen(port);
console.log('api running on ' + port);