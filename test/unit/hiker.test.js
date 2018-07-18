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

    it('names the long trails hiked', () => {
        
    });



    

});