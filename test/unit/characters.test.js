const chai = require('chai');
const { assert } = chai;
const Character = require('../../lib/models/character');

// const getErrors = (validation, numberExpected) => {
//     assert.isDefined(validation);
//     const errors = validation.errors;
//     assert.equal(Object.keys(errors).length, numberExpected);
//     return errors;
// };

describe('Character model', () => {

    it('validates a good model', () => {
        const data = {
            name: 'Fribbitz the Mamba',
            class: 'Thief',
            race: 'Human',
            description: 'A slippery and stealthy burglar, Fribbitz is a master at hoisting himself onto second floor balconies and through open windows to commit his crimes.',
            hp: 10,
            attributes: {
                STR: 12,
                INT: 14,
                WIS: 13,
                DEX: 17,
                CON: 14,
                CHA: 16
            }
        };

        const character = new Character(data);

        const json = character.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(character.validateSync());

    });
});