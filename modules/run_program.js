const express  = require("express");
var path       = require("path");
var fs         = require("fs");
const { exec } = require("child_process");
var mysql      = require("mysql");

const router_program = express.Router();

router_program.get("/Python3", function(req, res){
	//res.sendFile(path.join(__dirname, "/web/Python.html"));
	if(req.session.usr){
		res.render("Python.ejs", {'code': "",'output':"This is Output"});
	} else{
		res.render("Login.ejs");	
	}
	
});

router_program.get("/Java", function(req, res){
	//res.sendFile(path.join(__dirname, "/web/Java.html"));
	if(req.session.usr){
		res.render("Java.ejs", {'code': "",'output':"This is Output"});
	} else{
		res.render("Login.ejs");	
	}	
});

router_program.post('/RunPython3', function(req, res){
   	//console.log(req.body);
   	var code = req.body.textbox;
   	console.log(code);
   	var output = "";
   	fs.writeFile('code.py', code, function (err) {
  		if (err) {
  			output = err;
  			//console.log(output);
  			res.render("Python.ejs", {'code': code,'output':output});
  		} else{
  			exec("python3 code.py", (error, stdout, stderr) => {
	    		if (error) {
	        		output = error;
  					//console.log(output);
  					res.render("Python.ejs", {'code': code,'output':output});
	    		}
	    		if (stderr) {
	        		output = stderr;
  					//console.log(output);
  					res.render("Python.ejs", {'code': code,'output':output});
	    		}
	    		if(stdout){
	    			output = stdout;
  					//console.log(output);
  					res.render("Python.ejs", {'code': code,'output':output});
	    		}    
			});			
  		}
	});   	
});

router_program.post('/RunJava', function(req, res){
   	//console.log(req.body);
   	var code = req.body.textbox;
   	console.log(code);
   	var output = "";
   	fs.writeFile('abc.java', code, function (err) {
  		if (err) {
  			output = err;
  			//console.log(output);
  			res.render("Java.ejs", {'code': code,'output':output});
  		} else{
  			exec("javac abc.java", (error, stdout, stderr) => {
	    		if (error) {
	        		output = error.message;
	        		//console.log(output);
	        		res.render("Java.ejs", {'code': code,'output':output});
	    		}else if (stderr) {
	        		output = stderr;
	        		//console.log(output);
	        		res.render("Java.ejs", {'code': code,'output':output});
	    		} else{
	    			exec("java abc", (error, stdout, stderr) => {
			    		if (error) {
			        		output = error.message;
			        		//console.log(output);
			        		res.render("Java.ejs", {'code': code,'output':output});
			    		} else if (stderr) {
			        		output = stderr;
			        		//console.log(output);
			        		res.render("Java.ejs", {'code': code,'output':output});
			    		} else{
			    			output = stdout;	
			    			//console.log(output);
			    			res.render("Java.ejs", {'code': code,'output':output});
			    			//res.redirect("Java.ejs", {'code': code,'output':output});
			    		}		    			
					});	
				}	
			});
  		}  		
	});   	
});

module.exports = router_program;