'use strict';

module.exports = (io, app) => {
    let appRooms = app.locals.chatrooms;
    io.of('/roomsList').on('connection', socket =>{// Connection is an event.
        console.log('Client is connected to server');
    });
}