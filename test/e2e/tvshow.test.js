const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Tv Show API', () => {

    beforeEach(() => dropCollection('shows'));

    let strangerThings;

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
        let bigMouth;
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
});