var express = require('express');
var router = express.Router();
var chat = " <div class = 'chat-div'><div class='chat'></div><input type='text' id='nameInput' placeholder='Name'><input type='text' id='messageInput' placeholder='Message'></div>"


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Kitchen'});
});

module.exports = router;
