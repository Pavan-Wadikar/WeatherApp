const { log } = require("console");
const { response } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  console.log("Post request Received");
  const query = req.body.CityName;
  const apiKey = "406ff7edb48ba9b30b883a48ebd3a578";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit +
    "";
  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(
        "<h1>Temperature in " + query + " is " + temp + " degrees celcius</h1> "
      );
      res.write("<h3>weather description is " + weatherDesc + " </h3>");

      res.write(" <img src=" + iconUrl + " alt=" + iconUrl + ">");
      res.send();
      console.log(weatherDesc);
    });
  });
});

app.listen(3001, () => {
  console.log("App running on port 3000");
});
