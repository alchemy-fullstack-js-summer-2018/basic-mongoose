const chai = require('chai');
const { assert } = chai;
const Team = require('../../lib/models/team'); 

// const getErrors = (validation, numberExpected) => {
//     assert.isDefined(validation);
//     assert.equal(Object.keys(errors).length, numberExpected);
//     const errors = validation.errors;
// };

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
        assert.equal(Object.keys(errors).length, 3);
        assert.equal(errors.roster.kind, 'required');
        
        // const errors = getErrors(team.validateSync(), 3);
        // assert.equal(errors.name.kind, 'required');
        // assert.equal(errors['location.state'].kind, 'required');
    });

    it('roster is at least 12', () => {
        const team = new Team({
            name: 'Team',
            location: { state: 'OR' },
            roster: 0
        });
        const validation = team.validateSync();
        const errors = validation.errors;
        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors.roster.kind, 'min');
    });
    
    it('roster is at most 15', () => {
        const team = new Team({
            name: 'Team',
            location: { state: 'OR' },
            roster: 16
        });

        const validation = team.validateSync();
        const errors = validation.errors;
        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors.roster.kind, 'max');
        // const errors = getErrors(team.validateSync(), 1);
    });

    it('limits stadium to square, oval or round', () => {
        const team = new Team({
            name: 'Team',
            location: { state: 'OR' },
            roster: 13,
            stadium: 'rectangle'
        });
        const validation = team.validateSync();
        const errors = validation.errors;
        assert.equal(Object.keys(errors).length, 1);

        assert.equal(errors.stadium.kind, 'enum');
    });
});
