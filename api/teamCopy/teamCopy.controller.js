const teamCopyDao = require('../../dao/teamCopy/teamCopy.dao');

function getTeamCopyResponse(req, res) {
    const date = req.query.date;
    const initiativeId = req.query.initiativeId;


    if (!date) {
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);
        teamCopyDao.getTeamCopy(today, initiativeId).then(doc => {
            if (doc) {
                res.send({
                    payload: {
                        data: doc
                    }
                });
            } else {
                res.send({
                    payload: {
                        data: "NO DATA FOUND"
                    }
                });
            }
        });
    } else {
        if (!initiativeId) {
            teamCopyDao.getTeamCopy(date, initiativeId).then(doc => {
                if (doc) {
                    res.send({
                        payload: {
                            data: doc
                        }
                    });
                } else {
                    res.send({
                        payload: {
                            data: "NO DATA FOUND"
                        }
                    });
                }
            })
        } else {
            teamCopyDao.getTeamCopy(date, initiativeId).then(doc => {
                if (doc) {
                    res.send({
                        payload: {
                            data: doc
                        }
                    });
                } else {
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
        initiativeId: req.params.initiativeId,
        arr : req.body
    }
    // console.log(data.arr,"data.arr in controller");
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


function addToTeamCopyResponse(req,res) {
    let data = {
        createdAt : req.params.date,
        initiativeId : req.params.initiativeId,
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


function assignOwner (req, res) {
    let data = {
        owner: req.body.owner || "",
        tasks: req.body.tasks,
        initiativeId: req.params.initiativeId
    }
    teamCopyDao.assignOwnerToTasks(data).then(data => {
        res.send(data)
    }).catch(err => {
        res.send({"message": "some thing went worng"})
    })


}
module.exports = {
    getTeamCopyResponse,
    updateTeamCopyResponse,
    addToTeamCopyResponse,
    assignOwner
}