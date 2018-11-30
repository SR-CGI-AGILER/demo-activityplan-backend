const teamCopyDao = require('../../dao/teamCopy/teamCopy.dao');

function getTeamCopyResponse(req, res) {
    // console.log(req)
    const date = req.query.date;
    const initiativeId = req.query.initiativeId;

    console.log(initiativeId)

    if (!date) {
        var now = new Date();
        console.log(now, "GET");
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
    let data1 = {
        teamCopyDate: req.params.date,
        taskId: req.params.taskId,
        initiativeId: req.params.initiativeId
    };
    teamCopyDao.updateTeamCopy(data1).then(doc => {
        res.send({
            payload: {
                data: doc
            }
        })
    });

}

module.exports = {
    getTeamCopyResponse,
    updateTeamCopyResponse
}