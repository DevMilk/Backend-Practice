// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/timestamp/:date_string?",function(req,res){
  var date; 
  var string = req.params.date_string;
  
  if (/\d{5,}/.test(string)) {
    dateInt = parseInt(string);
    //Date regards numbers as unix timestamps, strings are processed differently
    res.json({ unix: string, utc: new Date(dateInt).toUTCString() });
  }
  date = new Date(string
  );

  if(!date.getTime()){
    if(!string)
      date = new Date();
    else
      return res.json({"error":"Invalid Date"});
  }
  
  res.json({"unix": date.getTime(), "utc" : date.toUTCString()});
})