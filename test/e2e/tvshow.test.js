const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('TV Show API', () => {

    beforeEach(() => dropCollection('shows'));

    let strangerThings;
    let bigMouth;

    function save(show) {
        return request
            .post('/api/tvshows')
            .send(show)
            .then(({ body }) => body);
    }

    beforeEach(() => {
        strangerThings = {
            name: 'Stranger Things',
            genre: 'Sci-Fi',
            characters: ['Dustin', 'Eleven', 'Hopper', 'Dart']
        };

        return save(strangerThings)
            .then(show => {
                strangerThings = show;
            });
    });

    it('saves a show', () => {
        assert.isOk(strangerThings._id);
    });

    it('binge watches a specific show', () => {
        return request
            .get(`/api/tvshows/${strangerThings._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, strangerThings);
            });
    });

    it('binge watches all the shows', () => {
        return save({
            name: 'Big Mouth',
            genre: 'Comedy',
            numberOfSeasons: 1
        })
            .then(show => {
                bigMouth = show;
            })
            .then(() => {
                return request
                    .get('/api/tvshows')
                    .then(({ body }) => {
                        assert.deepEqual(body, [strangerThings, bigMouth]);
                    });
            });
    });

    it('updates a tv show', () => {
        strangerThings.characters = ['Barb'];

        return request
            .put(`/api/tvshows/${strangerThings._id}`)
            .send(strangerThings)
            .then(({ body }) => {
                assert.deepEqual(body, strangerThings);
            });
    });

    it('deletes a show, sadly', () => {
        return request
            .delete(`/api/tvshows/${strangerThings._id}`)
            .then(result => {
                assert.deepEqual(result.body, { removed: true });
            })
            .then(() => {
                return request.get('/api/tvshows');
            })
            .then(({ body }) => {
                assert.deepEqual(body, []);
            });
    });

    it('returns false if remove was unsuccessful', () => {
        return request
            .delete('/api/tvshows/5b4f7eff5e411bed072d5c6a')
            .then(result => {
                assert.deepEqual(result.body, { removed: false });
            });
    });
});