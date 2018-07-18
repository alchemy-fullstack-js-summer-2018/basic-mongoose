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
    });

    

});