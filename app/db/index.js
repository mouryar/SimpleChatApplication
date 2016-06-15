'use strict';

const config = require('../config')
const Mongoose = require('mongoose').connect(config.dbURI);


//Log Error if connection fails

Mongoose.connection.on('error', (error) =>{
    console.log(error);
});

//create a schema that defines the structure for storing user data
const chatUser = new Mongoose.Schema({
    profileId: String,
    fullName: String,
    profilePic: String
});

//Turn the schema into Model
let userModel = Mongoose.model('chatuser', chatUser);

//Finds a single document 
let findOne = profileId => {
    return userModel.findOne({
        "profileId": profileId
    })
};

let createNewUser = profile =>{
    return new Promise((resolve, reject) => {
        let newChatUser = new userModel({
            profileId: profile.id,
            fullName: profile.displayName,
            profilePic: profile.photos[0].value || ''
        });
        newChatUser.save(error => {
            if(error){
                reject(error);
            }else{
                resolve(newChatUser);
            }
        })
    })
}

let findById = id =>{
    return new Promise((resolve, reject) => {
        userModel.findById(id, (error, user) => {
            if(error){
                reject(error);
            }else{
                resolve(user);
            }
        });
    });
}

module.exports = {
    Mongoose,
    findOne,
    createNewUser,
    findById
}