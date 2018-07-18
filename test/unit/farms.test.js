const chai = require('chai');
const { assert } = chai;
const Farm = require('../../lib/models/farm');

const getErrors = (validation, numberExpected) => {
    assert.isDefined(validation);
    const errors = validation.errors;
    assert.equal(Object.keys(errors).length, numberExpected);
    return errors;
};

describe('Farm model', () => {

    it('validates good model', () => {
        const data = {
            name: 'Rising River Farm',
            address: {
                street: '13208 201st Ave SW',
                city: 'Rochester',
                state: 'WA',
                zip: '98579'
            },
            practices: 'Certified Organic',
            rating: 5,
            size: 'medium', 
            organic: true,
            products: ['vegetables', 'fruits', 'herbs']
        };

        const farm = new Farm(data);

        const json = farm.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(farm.validateSync());
    });

    it('validates required fields', () => {
        const farm = new Farm({});
        const errors = getErrors(farm.validateSync(), 3);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors['address.state'].kind, 'required');
        assert.equal(errors.rating.kind, 'required');    
    });

    it('limits size to small, medium or large', () => {
        const company = new Farm({
            name: 'Rising River Farm',
            address: { state: 'WA' },
            rating: 3,
            size: 'mini'
        });

        const errors = getErrors(company.validateSync(), 1);
        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors.size.kind, 'enum');
    });

    it('rating is at least 1', () => {
        const farm = new Farm({
            name: 'Rising River Farm',
            address: { state: 'WA' },
            rating: 0
        });

        const errors = getErrors(farm.validateSync(), 1);
        assert.equal(Object.keys(errors).length, 1);
        assert.equal(errors.rating.kind, 'min');
    });

    it('rating is at most 5', () => {
        const farm = new Farm({
            name: 'Rising River Farm',
            address: { state: 'WA' },
            rating: 6
        });

        const errors = getErrors(farm.validateSync(), 1);
        assert.equal(errors.rating.kind, 'max');
    });


});