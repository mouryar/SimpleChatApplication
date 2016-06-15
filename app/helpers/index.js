'use strict';

//A middlewear function to see if user is authenticated or not.

let isUserAuthenticated = (req, res, next) =>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/');
    }
}

module.exports = {
    isUserAuthenticated
}