const chai = require('chai');
const { assert } = chai;
const Team = require('../../lib/models/team'); 

const getErrors = (validation, numberExpected) => {
    assert.isDefined(validation);
    const errors = validation.errors;
    console.log('*** errors ***', numberExpected);
    assert.equal(Object.keys(errors).length, numberExpected);
};

describe('Team model', () => {
    
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
        const team = new Team(data);
        
        const json = team.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(team.validateSync());
    });
    it('validates required fields', () => {
        const team = new Team({});
        const validation = team.validateSync();
        assert.isDefined(validation);

        const errors = validation.errors;
        // assert.equal(Object.keys(errors).length, 3);
        assert.equal(errors.roster.kind, 'required');

        // const errors = getErrors(team.validateSync(), 3);
        // assert.equal(errors.name.kind, 'required');
        // assert.equal(errors['location.state'].kind, 'required');
    });
    
});
