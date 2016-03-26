/**
 *  UI Request
 */

// requirements
const express = require('express');
const router = express.Router();
const fs = require('fs');

router.param('uiNum', function (req, res, next, value) {
  // get the content
  var uiNum = value;

  fs.readFile('public/' + uiNum + '/index.html', function (err, data) {
    if (err) {
      var err = new Error();
      err.status = 404;
      return next(err);
    }
    else {
      res.locals.uiNum = uiNum;
      res.locals.gottenHTML = data;
      next();
    }
  });
});

router.get('/:uiNum(\\d{3})\/?$', function (req, res) {
  // get the content
  res.render('_templates/ui.html');
});

module.exports = router;
