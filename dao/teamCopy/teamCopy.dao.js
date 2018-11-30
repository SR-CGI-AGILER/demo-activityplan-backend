const teamCopy = require('../../model/teamCopy');

function createTeamCopy(plan) {
    return new Promise(function (resolve, reject) {
        const newTeamCopy = new teamCopy({
            createdAt: plan.createdAt,
            initiative: plan.initiative,
            initiativeId: plan.initiativeId,
            tasks: plan.tasks
        })
        newTeamCopy.save(function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

function updateTeamCopy(data) {
    return new Promise(function (resolve, reject) {
        teamCopy.findOne({
            "createdAt":new Date(data.teamCopyDate).toISOString()
        },function(err, doc){
            if(err)
            {
                console.log(err)
            reject(err)
            }
            else{
                doc.tasks.map(function(e){
                let a = e._id.toString();
                    console.log(a,data.taskId,"each task")
                    if(a === data.taskId){
                        e.status = "Completed";
                    }
                })
                doc.save().then(function () {
                    resolve(doc)
})
                // resolve(doc);
            }
        
        });
        // console.log(a,"A")
        // console.log(a.tasks,"is it an array?")
        // a.tasks.map(function(e){
        //     if(e._id === data.taskId)
        //     {
        //         if(e.status === "Standup"){
        //             e.status = "Completed";
        //         }
        //        else
        //        {
        //            console.log("anirudha")
        //        }
        //     }
        //     else{
        //         console.log("atreya")
        //     }
        // })
    })
}

function getTeamCopy(date, initiativeId){
    return new Promise(function (resolve, reject) {
        teamCopy.findOne({
            "createdAt": date,
            "initiativeId":initiativeId
        }, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data)
        })
    })
}

module.exports = {
    createTeamCopy,
    getTeamCopy,
    updateTeamCopy
}