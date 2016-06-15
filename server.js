'use strict';

const express = require('express');
const app = express();
const chatCat = require('./app');
const passport = require('passport');


app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(chatCat.session);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', chatCat.router);



app.get('/dashboard', (req,res,next) => {
    res.send("<h1> I am back dashboard "+req.hello+"</h1>");
});

chatCat.ioServer(app).listen(app.get('port'), () =>{
    console.log("Application running on port 3000");
});