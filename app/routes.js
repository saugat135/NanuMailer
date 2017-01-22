// require express
var express = require('express')
var path = require('path')

// create our router object
var router = express.Router()

// export router
module.exports = router

// create mailer object
var nodeMailer = require('nodemailer')
// route for our homepage
router.get('/', function(request, response) {
  response.render('pages/index')
})

// route for our about page
router.get('/about', function(request, response) {
  var users = [
    {name: "Saugat Gautam", email: "saugatgautam@lftechnology.com", avatar: "http://placekitten.com/300/400"},
    {name: "Saugat Gautam", email: "saugatgautam@lftechnology.com", avatar: "http://placekitten.com/700/400"},
    {name: "Saugat Gautam", email: "saugatgautam@lftechnology.com", avatar: "http://placekitten.com/600/500"},
    {name: "Saugat Gautam", email: "saugatgautam@lftechnology.com", avatar: "http://placekitten.com/700/700"}
  ]
  response.render('pages/about', {users: users})
})

// route for our contact page
router.get('/contact', function(request, response) {
  console.log("GET called")
  response.render('pages/contact')
})
router.post('/contact', function(request, response) {
  console.log("POST called")
  response.send('Thanks for contacting us, ' + request.body.name + '. You will receive a mail shortly for a free coupon')
  var transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'saugatbizid@gmail.com',
      pass: 'saugat.gautam@13579'
    }
  })
  var text = request.body.message
  var mailOptions = {
    from: 'saugatgautam@lftechnology.com',
    to: request.body.email,
    subject: 'Testing mail from node.js using nodemailer',
    text: text
  }
  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      console.log(error)
      response.json({yo: 'error'})
    } else {
      console.log('Message sent: ' + info.response)
      response.json({yo: info.response})
    }
  })
})
