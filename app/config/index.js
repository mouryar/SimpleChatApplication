'use strict';

if(process.env.NODE_ENV === 'production')
{
    module.exports = {
         "host":process.env.host || "",
         "dbURI":process.env.dbURI || "",
         "sessionSecret":process.env.sessionSecret,
         "fb": {
                    "clientID": process.env.clientID,
                    "clientSecret": process.env.clientSecret,
                    "callbackURL": process.env.host+"/auth/facebook/callback",
                    "profileFields": ["id","diplayName","photos"]
                },
         "twitter":{
                        "consumerKey": process.env.twCosumerKey,
                        "consumerSecret": process.env.twConsumerSecret,
                        "callbackURL": process.env.host+"/auth/twitter/callback",
                        "profileFields": ["id","displayName","photos"]
                    }
                
    }
}else{
    module.exports = require('./development.json')
}