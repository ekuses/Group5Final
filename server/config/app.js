var config = require('./config'), 
    mongoose = require('mongoose'),   
    express = require('./express');

module.exports.start = function() {
    var app = express.init();
    let port = process.env.PORT;
    if (port == null || port == '')
    {
        port = config.port;
    }
  app.listen(port, function() {
    console.log('App listening on port',port);
  });
};