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

    it('checks that the minimum number of seasons is 1', () => {
        const show = new Show({
            name: 'Game of Thrones',
            firstAired: '2011',
            networkType: 'cable',
            seasons: 0,
        });
        const errors = getErrors(show.validateSync(), 1);
        assert.equal(Object.keys(errors).length, 1); 
        assert.equal(errors.seasons.kind, 'min'); 
    });

    it('checks that the network type is either cable or broadcast', () => {
        const show = new Show({
            name: 'Game of Thrones',
            firstAired: '2011',
            networkType: 'streaming',
            seasons: 7,
        });
        const errors = getErrors(show.validateSync(), 1);
        assert.equal(Object.keys(errors).length, 1); 
        assert.equal(errors.networkType.kind, 'enum'); 
    });
});