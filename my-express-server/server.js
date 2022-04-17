const express = require("express");
const app = express();

app.get("/", function(req, res){
  res.send("<h1>hello</h1>");
});

app.get("/contact", function(req, res){
  res.send("Contact me!!")
})

app.get("/about", function(req, res){
  res.send("I own this!! And by 'I', I mean 'I' :)")
})

app.listen(3000, function(){
  console.log("Server started on 3000")
});
