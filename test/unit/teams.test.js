const chai = require('chai');
const { assert } = chai;
const Teams = require('../../lib/models/teams'); 

const getErrors = (validation, numberExpected) => {
    assert.isDefined(validation);
    const errors = validation.errors;
    assert.equal(Object.keys(errors).length, numberExpected);
};

describe('Teams model', () => {
    it('validates good model', () => {
        const data = {
            name: 'Trailblazers',
            location: {
                city: 'Portland',
                state: 'OR'
            },
            stadium: 'round',
            roster: 13          
        };
        const team = new Teams(data);

        const json = team.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(team.validateSync());
    });
});