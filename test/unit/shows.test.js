const chai = require('chai');
const { assert } = chai;
const Show = require('../../lib/models/show');

const getErrors = (validation, number) => {
    assert.isDefined(validation);
    const errors = validation.errors;
    assert.equal(Object.keys(errors).length, number);
    return errors;
};

describe('TV Show model', () => {
    const data = {
        name: 'Game of Thrones',
        crew: {
            creators: 'David Benioff & D.B. Weiss',
            directors: ['Alan Taylor', 'Michelle MacLaren'],
            cinematographer: 'Alik Sakharov'
        },
        firstAired: '2011',
        networkType: 'cable',
        seasons: 7,
        ended: false,
        actors: ['Peter Dinklage', 'Lena Headey', 'Rose Leslie']
    };
    
    it('validates good model', () => {
        const show = new Show(data);
        const json = show.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(show.validateSync());
    });

    it('validates required fields', () => {
        const show = new Show({});
        const errors = getErrors(show.validateSync(), 3);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.firstAired.kind, 'required');
        assert.equal(errors.networkType.kind, 'required');
    });
});