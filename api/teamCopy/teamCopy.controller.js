const teamCopyDao = require('../../dao/teamCopy/teamCopy.dao');

function getTeamCopyResponse(req, res) {
    const date = req.query.date;
    const initiatives = req.query.initiatives;


    if(!date){
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth()+ 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);
        teamCopyDao.getTeamCopy('2018-10-21', "default").then(doc => {
            if(doc){
                res.send({
                    payload: {
                            data: doc
                        }
                    });
            }
            else{
                res.send({
                    payload: {
                            data: "NO DATA FOUND"
                        }
                    });
            }
        });
    }
    else{
        if(!initiatives){
            teamCopyDao.getTeamCopy(date, "default").then(doc=>{
                if(doc){
                    res.send({
                        payload: {
                                data: doc
                            }
                        });
                }
                else{
                    res.send({
                        payload: {
                                data: "NO DATA FOUND"
                            }
                        });
                }
            })    
        }
        else{
            teamCopyDao.getTeamCopy(date, initiatives).then(doc => {
                if(doc){
                    res.send({
                        payload: {
                                data: doc
                            }
                        });
                }
                else{
                    res.send({
                        payload: {
                                data: "NO DATA FOUND"
                            }
                        });
                }
            })
        }
    }
}

function updateTeamCopyResponse(req, res) {

    let data  ={
        teamCopyDate: req.params.date,
        arr : req.body
    }
    teamCopyDao.updateTeamCopy(data).then(doc => {
        res.send({
            payload: {
                data: doc
            }
        })
    }).catch(err =>{
        res.send(err)
    })
 }

function updateTeamCopyResponse(req, res) {
    let data1 = {
        teamCopyDate: req.params.date,
        taskId: req.params.taskId
    };    
    teamCopyDao.updateTeamCopy(data1).then(doc => {
        res.send({
            payload: {
                data: doc
                }
        })
    });

}

function addToTeamCopyResponse(req,res) {
    let data = {
        createdAt : req.params.date,
        initiatives : req.params.initiative,
        task : req.body
    };
    teamCopyDao.addToTeamCopy(data).then(doc =>{
        res.send({
            payload: {
                data : doc
            }
        })
    })
}

module.exports = {
    getTeamCopyResponse,
    updateTeamCopyResponse,
    addToTeamCopyResponse
}