const express = require('express');
const router = express.Router();

let userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', userController.signup)

router.post('/signin', userController.signin)

module.exports = router;
