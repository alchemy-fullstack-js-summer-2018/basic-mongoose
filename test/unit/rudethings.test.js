const chai = require('chai');
const { assert } = chai;
const Rudething = require('../../lib/models/rudething');


describe('Rude thing model', () => {
    
    // const getErrors = (validation, numberExpected) => {
    //     assert.isDefined(validation);
    //     const errors = validation.errors;
    //     assert.equal(Object.keys(errors).length, numberExpected);
    //     return errors;
    //};

    it('validates a good model'), () => {
        const data = { 
            name: 'Donald Trump',
            human: true,
            age: 72,
            zodiac: 'Gemini',
            personality: {
                traits: ['narcissistic', 'greedy', 'impulsive'],
                rudeness: 10,
                empathy: 0
            },
            profession: 'President'
        };
        const rudething = new Rudething(data);
    
        const json = rudething.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(rudething.validateSync());
    };

  
}); 


