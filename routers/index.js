var express = require('express');
var router = express.Router();
var controllers = require('../controllers/index');

router.get('/', controllers.index);

module.exports = router;
