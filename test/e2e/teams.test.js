const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Teams API', () => {
    beforeEach(() => dropCollection('teams'));

    let team;

    beforeEach(() => {
        const data = {
            name: 'Evil Geniuses',
            region: 'North America',
            members: ['Arteezy', 'Suma1l', 's4', 'Cr1t-', 'Fly'],
            coach: 'BuLba',
            invited: false
        };
        
        return request
            .post('/api/teams')
            .send(data)
            .then(({ body }) => team = body);
    });

    it('should POST a team', () => {
        assert.isOk(team._id);
    });

    it('should GET all teams', () => {
        return request
            .get('/api/teams')
            .then(({ body }) => {
                assert.deepEqual(body, [team]);
            });
    });

    it('should GET a team by id', () => {
        return request
            .get(`/api/teams/${team._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, team);
            });
    });

    it('should GET a team by query', () => {
        return request
            .get('/api/teams?region=North%20America')
            .then(({ body }) => {
                assert.deepEqual(body, [team]);
            });
    });

    it('should PUT a team', () => {
        team.name = 'EG';
        return request
            .put(`/api/teams/${team._id}`)
            .send(team)
            .then(({ body }) => {
                assert.deepEqual(body, team);
            });
    });

    it('should DELETE a team', () => {
        return request
            .del(`/api/teams/${team._id}`)
            .then(res => {
                assert.equal(res.status, 200);
            })
            .then(() => {
                return request.get(`/api/teams/${team._id}`);
            })
            .then(({ body }) => {
                assert.isNotOk(body);
            });
    });

    it('should return DEL error on bad id', () => {
        return request
            .del('/api/teams/5b4f7b676444b0102909d162')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });

});