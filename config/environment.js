environment = process.env.NODE_ENV
server = {}
if(environment === 'dev'){
    server = {
        host: 'localhost:4000',
        apiEndPoint: '/api/v1'
    }
}

if(environment === 'prod'){
    server = {
        host: 'agiler.stackroute.in',
        apiEndPoint: '/api/v1'
    }
}

module.exports = server