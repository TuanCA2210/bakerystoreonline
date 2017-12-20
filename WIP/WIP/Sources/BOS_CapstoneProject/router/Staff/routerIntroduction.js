const controller = require('../../Controller/IntroductionController.js')
var bodyParser = require('body-parser');

const express = require('express');
var router = express.Router();
var exports = [];

router.post('/InsertIntroduction',controller.InsertIntroduction);

router.get('/PreUpdateIntroduction',controller.PreUpdateIntroduction);
router.post('/UpdateIntroduction',controller.UpdateIntroduction);

module.exports = router;
