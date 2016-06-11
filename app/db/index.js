'use strict';

const config = require('../config')
const mongoose = require('mongoose').connect(config.dbURI);


//Log Error if connection fails

mongoose.connection.on('error', (error) =>{
    console.log(error);
});

module.exports = {
    mongoose
}