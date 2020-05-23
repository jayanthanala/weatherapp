const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

var temp = "";
var city = "";
var imgUrl = "";
var icon = "";
var dec = "";
var url = "";

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  city = req.body.cityName;
  url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f5c12600a12be9fa30f6b2627510e5b4&units=metric";
  https.get(url, function(response) {
    console.log(response.statusCode);
    console.log(response.statusMessage);
    response.on("data", function(data) {
      doc = JSON.parse(data);
      temp = doc.main.temp;
      dec = doc.weather[0].description;
      icon = doc.weather[0].icon;
      imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.render("weather",{cityn: city, temper: temp, description: dec, urlimg: imgUrl})
      // res.setHeader('Content-Type', 'text/html');
      // res.write(__dirname+"/weather.html");
      // res.write("<center><h1>The temperature in " + city + " is " + temp + " Degree Celcius</h1></center>");
      // res.write("<center><p>The weather is currently " + dec + "</p><center>");
      // res.write("<center><img src=" + imgUrl + " ><center>");
      // res.send();
      //res.redirect("/");
    });
  });
});

app.post("/return",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(req, res) {
  console.log("Server is up and running at port 3000");
})
