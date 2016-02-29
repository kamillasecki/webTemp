//Lets require/import the HTTP module
var http = require('http');
var express = require('express');
var app = express();
var port = 8080;
var mesure = require('./actions/mesure.js')

//Lets define a port we want to listen to
const PORT=8080;

//We need a function which handles requests and send response


app.get('/', function (req, res) {
    mesure.get(req, res);
});

//Lets start our server
app.listen(PORT, function () {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});