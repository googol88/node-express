const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Serve string
// app.get("/", function(req, res) { res.send('Hello Express')})

// Serve file
absolutePath = __dirname + '/views/index.html'
app.get("/", (req, res) => { res.sendFile(absolutePath)})

// serve assets (like .css files)
app.use('/public', express.static(__dirname + '/public'))

// serve JSON at specific route
app.get("/json", (req, res) => { 
  res.json({ "message": (process.env.MESSAGE_STYLE === 'uppercase' ? "HELLO JSON" : "Hello json") })
})

// root-level logger middleware
/*app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})*/

// (11) Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({extended: false}))

// chain middleware for time server
app.get('/now', (req, res, next) => {
  req.time = new Date().toString()
  next()
}, (req, res) => {
  res.json({ time: req.time })
})

// route parameters
app.get('/:word/echo', (req, res) => {
  res.json({ echo: req.params.word })
})

// route queries
app.get('/name', (req, res) => {
  res.json({ name: req.query.first + ' ' + req.query.last })
})

// (12) Get Data from POST Requests
app.post('/name', (req, res) => {
  res.json({ name: req.body.first + ' ' + req.body.last })
})

// app.route('/name').get(handler).post(handler)

module.exports = app