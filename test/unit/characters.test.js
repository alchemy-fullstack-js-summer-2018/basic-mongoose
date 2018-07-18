const chai = require('chai');
const { assert } = chai;
const Character = require('../../lib/models/character');

const getErrors = (validation, numberExpected) => {
    assert.isDefined(validation);
    const errors = validation.errors;
    assert.equal(Object.keys(errors).length, numberExpected);
    return errors;
};

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

    it('validates required fields', () => {
        const character = new Character({});
        const errors = getErrors(character.validateSync(), 3);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.class.kind, 'required');
        assert.equal(errors.description.kind, 'required');
        
    });

    it('Checks that Hit Points are a minimum of 4', () => {
        const character = new Character({
            name: 'Tim the Enchanter',
            class: 'Magic User',
            hp: 3,
            description: 'A very silly person. Big fan of shrubbery. Somewhat dangerous to surrounding landscape.'
        });

        const errors = getErrors(character.validateSync(), 1);
        assert.equal(errors.hp.kind, 'min');
    });

    it('Checks to make sure the class is included in allowed values', () => {
        const character = new Character({
            name: 'Polly the Witch',
            class: 'Witch',
            hp: 10,
            description: 'Not a witch. Well, maybe a little witchy. OK to be fair, she is totally a witch.'
        });

        const errors = getErrors(character.validateSync(), 1);
        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors.class.kind, 'enum');

    });
});