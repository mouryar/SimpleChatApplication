'use strict';

const passport = require('passport');
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;
const db = require('../db');
const TwitterStrategy = require('passport-twitter').Strategy;

module.exports = () =>{
    passport.serializeUser((user, done) =>{
        done(null, user.id);
    })
    
    passport.deserializeUser((id, done) =>{
        db.findById(id)
            .then(user => done(null, user))
            .catch(error => console.log("Error occured while finding user"));
    })
    
    let authProcessor = (accessToken, refreshToken, profile, done)=>{
        //Find the used in local db using profile.id
        //If user id is found return the date uing done
        //if the user is not found in db create one and return
        db.findOne(profile.id)
            .then(result => {
                if(result){
                    done(null, result);
                }else{
                    //create one user and return it.
                    db.createNewUser(profile)
                        .then(newChatUser => done(null, newChatUser))
                        .catch(error =>{
                            console.log('Error while creating new user' + error);
                        })
                }
            });
    };
    passport.use(new FacebookStrategy(config.fb, authProcessor));
    passport.use(new TwitterStrategy(config.twitter, authProcessor));
}