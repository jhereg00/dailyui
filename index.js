/**
 *  Index js file
 *  Inits Express and launches server
 */

// requirements
const express = require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');

// settings
const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || (ENV === 'development' ? 3000 : 3000);

// init express
var app = express();
// establish nunjucks as the rendering engine
var njEnv = nunjucks.configure(['app/views'], {
  express: app,
  autoescape: false,
  watch: ENV === 'development'
});
// add useful dump function
njEnv.addGlobal('dump', function (data) {
  if (ENV === 'development') {
    if (typeof data == 'object') {
      return "<pre>" + JSON.stringify(data, null, '  ') + '</pre>';
    }
    else {
      return "<pre>" + data + " (" + (typeof data) + ")";
    }
  }
});

//////////////
// Express Middleware
//////////////
// logging
app.use(morgan(ENV === 'development' ? 'dev' : 'combined'));
// ui
app.use(require('./app/controllers/ui'));
// static assets
app.use(express.static('./public/'));
// add template data
app.use(require('./app/middleware/templateData'));
// basic routes
app.use(require('./app/controllers/index'));
// handle errors
app.use(require('./app/controllers/404').handle);
app.get('*',require('./app/controllers/404').render);

//////////////
// Start Express App
//////////////
var server = app.listen(PORT, function () {
  console.log('Express listening on port ' + PORT);
});
