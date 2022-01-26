var express = require('express');
var app = express();

// Serve string
// app.get("/", function(req, res) { res.send('Hello Express')})

// Serve file
absolutePath = __dirname + '/views/index.html'
app.get("/", (req, res) => { res.sendFile(absolutePath)})

// serve assets (like .css files)
app.use('/public', express.static(__dirname + '/public'))

// serve JSON at specific route
app.get("/json", (req, res) => { 
  res.json({"message": (process.env.MESSAGE_STYLE === 'uppercase' ? "HELLO JSON" : "Hello json")})
})

// root-level logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
})

// chain middleware for time server
app.get('/now', (req, res) => {
  req.time = new Date().toString();
  next();
}),

























 module.exports = app;
