const express  = require("express");
var mysql      = require("mysql");
var session    = require("express-session");

const router_login = express.Router();

router_login.get("/Login", function(req, res){
	if(req.session.usr){
		res.render("Java.ejs", {'error':''});	
	} else{
		res.render("Login.ejs");	
	}	
});

router_login.post("/Login", function(req, res){
	//console.log(req);
	console.log("User : " + req.body.user);
	//console.log(req.body.pw);

	var con = mysql.createConnection({
  		host:     "sql12.freesqldatabase.com",
  		user:     "sql12322996",
  		password: "ERRF5tRLE9",
  		database: "sql12322996"
	});

	con.connect(function(err) {
  		if (err){
  			res.render("Login.ejs", {'error':err});
  			return;
  		}
		con.query("SELECT pw FROM users where prn = '" + req.body.user + "'" , function (err, result, fields) {
			if (err){
				res.render("Login.ejs", {'error':err});		
				return;
			}
			console.log(result[0].pw);
			if(result[0].pw == req.body.pw){
				req.session.usr = req.body.user;
				res.render("Java.ejs", {'code': "",'output':"This is Output"});
			} else{
				res.render("Login.ejs", {'error':'Login Failed, Username or Password is Wrong'});	
			}
		});
	});	
});

router_login.post("/Logout", function(req, res){
	req.session.destroy(function(err){
		if(err){
			res.render("Login.ejs", {'error':err});
		}else{
			res.render("Login.ejs", {'error':''});
		}
	});
});

module.exports = router_login;