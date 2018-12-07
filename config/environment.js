environment = process.env.NODE_ENV
server = {}
if(environment === 'dev'){
    server = {
        host: 'localhost:4200',
        apiEndPoint: '/api/v1',
        mongo:'localhost'
    }
}

if(environment === 'prod'){
    server = {
        host: 'agiler.stackroute.in',
        apiEndPoint: '/api/v1',
        mongo: 'mongo'
    }
}

module.exports = server