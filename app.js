const express = require ("express");
var bodyParser = require('body-parser')
const https = require('https');
const app = express();
app.set('view engine', 'ejs');
app.use( bodyParser.urlencoded({ extended: true}))
app.use(express.static("public"))
app.set('view engine', 'ejs');
app.get("/",function(req,res){
    
    res.sendFile(__dirname+ "/index.html")
   

    app.post("/",function(req,res){

        const query = req.body.cityName;
      const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+  "&appid=d65243b3ecfbfc6d8d0224f4f7d0708a&units=metric"
     
     https.get(url,function(response){
         console.log(response)
         response.on("data",function(data){
           
            let weatherData = JSON.parse(data)
            let description = weatherData.weather[0].description;
            let icon = weatherData.weather[0].icon;
            let imageUrl = " http://openweathermap.org/img/wn/"+ icon + "@2x.png"
            let temp = weatherData.main.temp;
           
           console.log(temp)
        // res.write("<h1>the weather in "+query+ " is "+temp+" degree Celcious</h1>")
        // res.write("<p>The weather description in "+query+ " is "+description+"</p>")
        // res.write("<img src ="+ imageUrl+">") 
        // res.send();
       app.get("/",function(req,res){
        res.render("list",{Name:query , temperature:temp});
        res.render("list",{Name:query , des:description} );
        res.render("list",{image:imageUrl} ); 
    })
    
        
        })
     })
       
     
    })
    
    // res.send("Hi how are You")
})

app.listen(3000,function(){
    console.log("Hi I am Listening")
})
