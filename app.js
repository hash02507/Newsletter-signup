const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const http=require("https");
require('dotenv').config();

app.use(bodyParser.urlencoded({extension:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    var firstName=req.body.firstInput;
    var secondName=req.body.secondInput;
    var email=req.body.emailInput;
    var data=
    {
        members:
        [
            {
                email_address:email,
                status:"unsubscribed",
                merge_fields:
                {
                    FNAME:firstName,
                    LNAME:secondName,
                },
            }
        ]
    }
    const jsonData=JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/5c98c963ac";
    const options=
    {
        method:"POST",
        auth:"aashish1:"+process.env.api_key,
    };
    const request= http.request(url,options,function(response)
    {   
        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else
        {
            res.sendFile(__dirname+"/failure.html");
        }
            response.on("data",function(data)
            {
                    console.log(JSON.parse(data));
            });
    });
    request.write(jsonData);
    request.end();
});


// {
//     "name": "$event_name",
//     "contact": $footer_contact_info,
//     "permission_reminder": "permission_reminder",
//     "email_type_option": true,
//     "campaign_defaults": $campaign_defaults
//   }
app.listen(3000,function(){
    console.log("Server 3000 is up and running successfully");
});


// api key 
//2ac356c3a924d75c9c98e196438a9b54-us21
// audience id
// 5c98c963ac.