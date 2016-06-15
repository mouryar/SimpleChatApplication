'use strict';

const router = require('express').Router();
const session = require('./session');
const helper = require('./helpers');
const passport = require('passport');
const auth = require('./auth')();
const config = require('./config');


router.get('/',(req,res,next) => {
    res.render('login');
});

router.get('/rooms',[helper.isUserAuthenticated,(req,res,next) => {
    res.render('rooms',{
        user: req.user,
        host: config.host
    });
}]);

router.get('/chats',[helper.isUserAuthenticated,(req,res,next) => {
    res.render('chatroom',{
        user: req.user
    });
}]);

router.get('/logout',(req,res,next) => {
    req.logout();
    res.redirect('/');
});

/*router.get('/getSession',(req,res,next) => {
    res.send('My name is: '+ req.session.favColour);
});

router.get('/setSession',(req,res,next) => {
    req.session.favColour = 'Mourya';
    res.send('Session Created');
});*/
router.get('/auth/facebook',passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook',{
        successRedirect:'/rooms',
        failureRedirect:'/'
    })
 );
 
 router.get('/auth/twitter',passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
    passport.authenticate('twitter',{
        successRedirect:'/rooms',
        failureRedirect:'/'
    })
 );


router.get('*',(req,res,next) => {
    res.status(404).sendFile(process.cwd() + '/views/404.htm');
});

//create IO server instance

let ioServer = app => {
    app.locals.chatrooms = [];
    const server = require('http').Server(app);
    const io = require('socket.io')(server);
    //It runs for every socket that is connected to server
    io.use((socket, next) => {
        require('./session')(socket.request, {}, next);
    });
    require('./socket')(io,app);
    return server;
}

module.exports = {
    router,
    session,
    ioServer
}