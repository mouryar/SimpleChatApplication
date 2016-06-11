'use strict';

const router = require('express').Router();
const session = require('./session');

router.get('/',(req,res,next) => {
    res.render('login');
});

router.get('/rooms',(req,res,next) => {
    res.render('rooms');
});

router.get('/chats',(req,res,next) => {
    res.render('chatroom');
});

router.get('/getSession',(req,res,next) => {
    res.send('My name is: '+ req.session.favColour);
});

router.get('/setSession',(req,res,next) => {
    req.session.favColour = 'Mourya';
    res.send('Session Created');
});

router.get('*',(req,res,next) => {
    res.status(404).sendFile(process.cwd() + '/views/404.htm');
});

module.exports = {
    router,
    session
}