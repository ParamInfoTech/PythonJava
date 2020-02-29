const express  = require("express");
var path       = require("path");
var bodyParser = require('body-parser');
var fs         = require("fs");
const { exec } = require("child_process");
var mysql      = require("mysql");
var session    = require("express-session");
const port     = process.env.PORT || 3000;

var app        = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(session({secret: '1234567890', cookie: { maxAge: 20*60*1000 }}));


app.get("/", function(req, res){
	res.sendFile(path.join(__dirname,"/web/index.html"));
});

app.get("/second.html", function(req, res){
	res.sendFile(path.join(__dirname,"/web/second.html"));
});

app.get("/third.html", function(req, res){
	res.sendFile(path.join(__dirname,"/web/third.html"));
});

const router_program = require("./modules/run_program.js");
const router_login   = require("./modules/logn.js");

app.use(router_program);
app.use(router_login);

app.listen(port);
console.log(router_program);
console.log('Server Listening on Port ${port}');