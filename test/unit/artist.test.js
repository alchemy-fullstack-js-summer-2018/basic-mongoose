const chai = require('chai');
const { assert } = chai;
const Artist = require('../../lib/models/artist');

describe('Artist model', () => {
    
    const getErrors = (validation, numberExpected) => {
        assert.isDefined(validation);
        const errors = validation.errors;
        assert.equal(Object.keys(errors).length, numberExpected);
        return errors;
    };
    
    it('validates a good model', () => {
        const data = {
            name: 'Weezer',
            genre: 'alt/pop rock',
            famousAlbums: ['The Blue Album', 'Pinkerton'],
            numAlbums: 10,
            stillActive: true
        };
        
        const artist = new Artist(data);
        
        const json = artist.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(artist.validateSync());
    });
    
    it('validates required fields', () => {
        const artist = new Artist({});
        const errors = getErrors(artist.validateSync(), 2);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.numAlbums.kind, 'required');
    });
    
    it('number of albums is at least 1', () => {
        const artist = new Artist({
            name: 'Wavves',
            genre: 'Surf Rock',
            famousAlbums: ['IV', 'No Life For Me'],
            numAlbums: 4,
            stillActive: true
        });
        
        assert.ok(artist.numAlbums > 0);
        artist.numAlbums = 0;
        const errors = getErrors(artist.validateSync(), 1);
        assert.equal(errors.numAlbums.kind, 'min');
    });

    it('validates that it is a group or a solo artist', () => {
        const artist = new Artist({
            name: 'Wu-Tang Clan',
            genre: 'Hip-Hop',
            style: 'band',
            famousAlbums: ['Enter the 36 Chambers of Shaolin'],
            numAlbums: 8,
            stillActive: true,
        });

        const errors = getErrors(artist.validateSync(), 1);
        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors.style.kind, 'enum');
    });

    it('defaults stillActive to true', () => {
        const artist = new Artist({
            name: 'A Tribe Called Quest',
            genre: 'Hip-Hop',
            famousAlbums: ['The Low End Theory'],
            numAlbums: 5
        });

        assert.strictEqual(artist.stillActive, true);
    });
});