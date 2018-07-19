const chai = require('chai');
const { assert } = chai;
const Hiker = require('../../lib/models/hiker');

const getErrors = (validation, numberExpected) => {
    assert.isDefined(validation);
    const errors = validation.errors;
    assert.equal(Object.keys(errors).length, numberExpected);
    return errors;
};

describe('Hiker Model', () => {

    it('validates a good model', () => {
        const data = {
            trailName: 'Snorkel',
            longTrail: 'PCT, CDT, AT',
            milesHiked: 7900,
            tripleCrown: true
        };

        const hiker = new Hiker(data);

        const json = hiker.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(hiker.validateSync());
    });

    it('validates required fields', () => {
        const hiker = new Hiker({});
        const errors = getErrors(hiker.validateSync(), 2);
        assert.equal(errors.trailName.kind, 'required');
        assert.equal(errors.longTrail.kind, 'required');
    });

    it('validates long trails hiked', () => {
        const hiker = new Hiker({
            trailName: 'Dirty Avocado',
            longTrail: 'TRT',
            milesHiked: 2654,
            tripleCrown: false
        });
        
        const errors = getErrors(hiker.validateSync(), 1);
        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors.longTrail.kind, 'enum');

    });

    it('checks minimum mileage to match at least one trail', () => {
        const hiker = new Hiker({
            trailName: 'Wired',
            longTrail: 'PCT, CDT, AT',
            milesHiked: 7900,
            tripleCrown: true
        });

        assert.ok(hiker.milesHiked > 2184);
        hiker.milesHiked = 900;
        const errors = getErrors(hiker.validateSync(), 1);
        assert.equal(errors.milesHiked.kind, 'min');
    });

    it('checks maximum mileage to match Triple Crown distance', () => {
        const hiker = new Hiker({
            trailName: 'Wired',
            longTrail: 'PCT, CDT, AT',
            milesHiked: 7900,
            tripleCrown: true
        });

        assert.ok(hiker.milesHiked < 7901);
        hiker.milesHiked = 14905;
        const errors = getErrors(hiker.validateSync(), 1);
        assert.equal(errors.milesHiked.kind, 'max');
    });

    it('defaults Triple Crown to false if not entered', () => {
        const hiker = new Hiker({
            trailName: 'Pitch',
            longTrail: 'PCT',
            milesHiked: 2654,
            
        });

        assert.strictEqual(hiker.tripleCrown, false);

    });



    

});