const userInitiativeDao = require('../dao/user-initiative/user-initiative.dao');
const jwt = require('jsonwebtoken');

function instantiateSocket(io){
    ioInst=io
    io.on('connection', function(socket){
        let decoded = jwt.decode(socket.request.cookies.jwtToken);
        let tempObj = {
            "email": decoded.token.email
        }
        userInitiativeDao.getUserInitiative(tempObj).then(function(result){
            result.initiative.map(eachInitiative => {
                // console.log(eachInitiative.initiativeId,"ID........")
                joinRoom(eachInitiative.initiativeId,socket)
            })
        })
        socket.on('message', function(data){
            io.in(data.initiativeId).emit('message', data)
        })
    })
}

function joinRoom(initiativeName,socket){
    socket.join(initiativeName)
    // console.log(socket.adapter.rooms,"JOINED")
}

module.exports = {
    instantiateSocket, joinRoom
}