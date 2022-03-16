const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true})) // post nested objects, requires
// urlencoded gives us access to the form data

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html"); // returns the current file path
});

app.post("/", function(req,res){

  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2); // explicit number conversion
  var result =  num1+num2;

  res.send("Result = " + result);
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
