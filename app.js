const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const http = require("https");



const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const email = req.body.email;

    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }

            }
        ]
    };

    const jsonData = JSON.stringify(data);
    
    const url = "https://us21.api.mailchimp.com/3.0/lists/cf5e2c0aa0";
    const option = {
        method: "POST",
        auth: "Firdbet:afda1cea8f8d34347288615b12d08e11-us21"
    }
    
  const request =  http.request(url, option, function(response){
      if(response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
      response.on("data", function(data){
        console.log(JSON.parse(data));
      })
   });
   request.write(jsonData);
   request.end();
})

app.post("/failure", function(req, res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});



// API keys
// 4ad43d1311b603b572aca07e89a7b652-us21

// Audience Id
// cf5e2c0aa0

// https://usX.api.mailchimp.com/3.0/lists/
