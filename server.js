// // import the http module
// var http = require('http')
//
// // handle sending requests and returning responses
// function handleRequests(request, response) {
//   // return string
//   response.end('Hello World')
// }
//
// // create the server
// var server = http.createServer(handleRequests)
//
// // start server and listen to port x
// server.listen(8080, function() {
//   console.log('Listening on port 8080')
// })

/******************* EXPRESS ******************/
var express = require('express')
var expressLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var app = express()
var port = 8080

// use ejs and express layouts
app.set('view engine', 'ejs')
app.use(expressLayouts)

// use body parser
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());

// route our app
var router = require('./app/routes')
app.use('/', router)

// set static files (css and images, etc) location
app.use(express.static(__dirname + '/public'))

// start the server
app.listen(port, function() {
  console.log('App started')
})
