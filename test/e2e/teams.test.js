const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Teams API', () => {
    
    beforeEach(() => dropCollection('teams'));

    let team;

    beforeEach(() => {
        const data = {
            name: 'Team',
            location: { state: 'OR' },
            roster: 13    
        };

        return request
            .post('/api/teams')
            .send(data)
            .then(({ body }) => team = body);
    });

    it('saves a team', () => {
        assert.isOk(team._id);
    });

    it('gets all teams', () => {
        return request
            .get('/api/teams')
            .then(({ body }) => {
                assert.deepEqual(body, [team]);
            });
    });

    it('gets a team by id', () => {
        return request
            .get(`/api/teams/${team._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, team);
            });
    });

    it('gets a team by query', () => {
        return request
            .get('/api/teams/?roster=13')
            .then(({ body }) => {
                assert.deepEqual(body, [team]);
            });
    });

    it('updates a team', () => {
        team.roster = 14;
        return request
            .put(`/api/teams/${team._id}`)
            .send(team)
            .then(({ body }) => {
                assert.deepEqual(body.roster, team.roster);
            });
    });

    it('deletes a team', () => {
        return request
            .delete(`/api/teams/${team._id}`)
            
            .then(() => {
                return request.get('/api/teams');
            })
            .then(({ body }) => {
                assert.deepEqual(body, []);
            });
    });
    it('returns false if delete was unsuccessful', () => {
        console.log('***body***', team);
        return request
            .delete('/api/teams/5b50ac161e81450c3dd1161c')
            .then(result => {
                assert.deepEqual(result.body, { removed: false });
            });
    });

}); 