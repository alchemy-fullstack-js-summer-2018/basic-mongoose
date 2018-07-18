const chai = require('chai');
const { assert } = chai;
const Rudething = require('../../lib/models/rudething');

const getErrors = (validation, numberExpected) => {
    assert.isDefined(validation);
    const errors = validation.errors;
    assert.equal(Object.keys(errors).length, numberExpected);
    return errors;
};

describe('Rude thing model', () => {

    it 'validates a good model', () => {
        const data = { 
            name: 'Donald Trump',
            human: true,
            age: 72,
            zodiac: 'Gemini',
            traits: ['narcissistic', 'greedy', 'impulsive']



        }
    }
})

