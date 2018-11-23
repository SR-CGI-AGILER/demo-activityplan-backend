const teamCopyDao = require('../../dao/teamCopy/teamCopy.dao');

function getTeamCopyResponse(req, res) {
    // console.log(req)
    const date = req.query.date;
    const initiatives = req.query.initiatives;

    console.log(initiatives)

    if(!date){
        var now = new Date();
        console.log(now,"GET");
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth()+ 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);
        teamCopyDao.getTeamCopy(today, "default").then(doc => {
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

module.exports = {
    getTeamCopyResponse
}