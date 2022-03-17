const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html")
  // we can have only one res.send but multiple res.write and then send it
})


app.post("/", function(req, res){
  const query = req.body.cityName
  const apiKey = "b8a6ee5f328fe115bf275989304ecb17"
  const units = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units + ""

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      res.setHeader("Content-type", "text/html");
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h2> The current weather is " + weatherDescription + " </h2>");
      res.write("<h1> The tempreature in " + query + " is " + temp + " </h1>");
      res.write("<img src=" + iconURL + ">");
      res.send()
    })
  })

})






app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
