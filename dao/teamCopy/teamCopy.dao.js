const teamCopy = require('../../model/teamCopy');

function createTeamCopy(plan) {
    return new Promise(function (resolve, reject) {
        const newTeamCopy = new teamCopy({
            createdAt: plan.createdAt,
            initiatives: plan.initiatives,
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

function getTeamCopy(date, initiatives){
    return new Promise(function (resolve, reject) {
        teamCopy.findOne({
            "createdAt": date,
            "initiatives":initiatives
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
    getTeamCopy
}