// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  // Create a new Date object with the provided date string
  const dateNewString = new Date(req.params.date);
  const dateNewUnix = Number( req.params.date )
  
  // Check if the date is valid
  if( !isNaN( dateNewString ) && dateNewString.toString() !== "Invalid Date" ){
      //res.render('index', {dateNow: dateNew})
      res.json( { unix: dateNewString.getTime(), utc: dateNewString.toUTCString() } )
  } 
  else if( !isNaN( dateNewUnix ) && new Date(dateNewUnix).toString() !== "Invalid Date" ) {
      res.json( { unix: new Date(dateNewUnix).getTime(), utc: new Date(dateNewUnix).toUTCString() } )
  }
  else {            
      res.status(400).json({ error: "Invalid Date" });
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
