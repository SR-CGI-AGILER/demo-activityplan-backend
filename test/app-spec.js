var request = require('supertest');
var assert = require('chai').assert;
var app = require('../app');

describe('get/teamCopy', function() {
    it('get team copy', function() {
     return request(app)
        .get('/api/v1/teamCopy')
        .set('Accept', 'application/json')
        .expect(200)
        .then(response => {
            console.log(response.body)
            // assert(response.payloa, 'team copy')
            assert.typeOf(response.body, 'object')
        
        })
    });
});
    describe('get/teamCopy', function() {
        it('get team copy', function() {
         return request(app)
            .get('/api/v1/teamCopy?date=2018-12-05&initiativeId=hi1w557jpaxyoej')
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                console.log(response.body)
                // assert(response.payloa, 'team copy')
                assert.typeOf(response.body, 'object')
            
            })
        });
    });
    describe('get/scheduledON', function() {
        it('get scheduledON', function() {
         return request(app)
            .get('/api/v1/scheduledy/task/hi1w557jpaxyoej')
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                console.log(response.body)
                // assert(response.payloa, 'team copy')
                assert.typeOf(response.body, 'object')
            
            })
        });
    });
    describe('get/scheduledFOR', function() {
        it('get scheduledFOR', function() {
         return request(app)
            .get('/api/v1/scheduledx/task/hi1w557jpaxyoej')
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                console.log(response.body)
                // assert(response.payloa, 'team copy')
                assert.typeOf(response.body, 'object')
            
            })
        });
    });
    describe('get/user initiative', function() {
        it('get user initiaTIVE', function() {
         return request(app)
            .get('/api/v1/user/initiatives/priyankadutta67@gmail.com')
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                console.log(response.body.data.initiative)
                // assert(response.payloa, 'team copy')
                assert.typeOf(response.body.data.initiative, 'array')
            
            })
        });
    });
    describe('get/initiative user', function() {
        it('get initiative user', function() {
         return request(app)
            .get('/api/v1/initiative/users/hi1w557jpaxyoej')
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                console.log(response.body)
                // assert(response.payloa, 'team copy')
                assert.typeOf(response.body, 'object')
            
            })
        });
    });
    describe('get/backlog task', function() {
        it('get backlog task', function() {
         return request(app)
            .get('/api/v1/backlog/hi1w557jpaxyoej')
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                console.log(response.body)
                // assert(response.payloa, 'team copy')
                assert.typeOf(response.body, 'object')
            
            })
        });
    });
    describe('post/activityplan', function() {
        it('post tactivity plan', function() {
         return request(app)
            .post('/api/v1/activityplan')
            .set('Accept', 'application/json')
            .send({"createdAt":"2018-12-06", "initiative":"initiative", "tasks":
                {
                    "text": "activity plan task",
                    "projectName":"proj"
                }
            })
            .expect(201)
            .then(response => {
                console.log(response.body.payload.data)
                // assert(response.payloa, 'team copy')
                assert.typeOf(response.body, 'object')
            
            })
        });
    });
    describe('post/backlog task', function() {
        it('post backlog task', function() {
         return request(app)
            .post('/api/v1/backlog/hi1w557jpaxyoej')
            .set('Accept', 'application/json')
            .send({"initiative":"initiative", "tasks":
               [{
                    "text": "backlog task",
                    "projectName":"proj"

                }]
            })
            .expect(201)
            .then(response => {
                console.log(response.body)
                // assert(response.payloa, 'team copy')
                assert.typeOf(response.body, 'object')
            
            })
        });
    });
    describe('post/scheduled task', function() {
        it('post scheduled task', function() {
         return request(app)
            .post('/api/v1/scheduled/task/hi1w557jpaxyoej')
            .set('Accept', 'application/json')
            .send({"initiative":"initiative", "tasks":
               [{
                    "text": "scheduled task",
                    "projectName":"proj"

                }]
            })
            .expect(201)
            .then(response => {
                console.log(response.body)
                // assert(response.payloa, 'team copy')
                assert.typeOf(response.body, 'object')
            
            })
        });
    });