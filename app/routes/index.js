'use strict';
const router = require('express').Router();
module.export = () => {
    let routes = {
        'get': {
            '/' : (req, res, next) => {
                res.render('login');
            },
            '/rooms':(req, res, next) => {
                res.render('rooms');
            },
            '/chats':(req, res, next) => {
                res.render('rooms');
            }
        },
        'post': {   
        }  
    } 
}