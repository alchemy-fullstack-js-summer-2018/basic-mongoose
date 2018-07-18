const chai = require('chai');
const { assert } = chai;
const Team = require('../../lib/models/team');

describe('Events model', () => {

    const getErrors = (validation, numberExpected) => {
        assert.isDefined(validation);
        const errors = validation.errors;
        assert.equal(Object.keys(errors).length, numberExpected);
        return errors;
    };

    it('validates good model', () => {
        const data = {
            name: 'Evil Geniuses',
            region: 'North America',
            members: ['Arteezy', 'Suma1l', 's4', 'Cr1t-', 'Fly'],
            coach: 'BuLba',
            invited: false
        };
        const team = new Team(data);
        const json = team.toJSON();
        delete json._id;
        assert.deepEqual(json, data);
        assert.isUndefined(team.validateSync());
    });

    it('validates required fields', () => {
        const team = new Team({});
        const errors = getErrors(team.validateSync(), 2);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.members.kind, 'user defined');
        assert.equal(errors.members.message, 'there must be 5 members');
    });

    it('validates region', () => {
        const team = new Team({
            name: 'Evil Geniuses',
            region: 'Africa',
            members: ['Arteezy', 'Suma1l', 's4', 'Cr1t-', 'Fly']
        });
        const errors = getErrors(team.validateSync(), 1);
        assert.equal(errors.region.kind, 'enum');
    });

    it('validates member name min length', () => {
        const team = new Team({
            name: 'Evil Geniuses',
            members: ['Arteezy', 'Suma1l', 's', 'Cr1t-', 'Fly']
        });
        const errors = getErrors(team.validateSync(), 1);
        assert.equal(errors['members.2'].kind, 'minlength');
    });

    it('validates member name max length', () => {
        const team = new Team({
            name: 'Evil Geniuses',
            members: ['Arteezy', 'Suma1234567890123456l', 's4', 'Cr1t-', 'Fly']
        });
        const errors = getErrors(team.validateSync(), 1);
        assert.equal(errors['members.1'].kind, 'maxlength');
    });

    it('validates coach name max length', () => {
        const team = new Team({
            name: 'Evil Geniuses',
            members: ['Arteezy', 'Suma1l', 's4', 'Cr1t-', 'Fly'],
            coach: 'BuLbabcdefghijklmnopqrstuvwxyz'

        });
        const errors = getErrors(team.validateSync(), 1);
        assert.equal(errors.coach.kind, 'maxlength');
    });

    it('validates invited default is false', () => {
        const team = new Team({
            name: 'Evil Geniuses',
            members: ['Arteezy', 'Suma1l', 's4', 'Cr1t-', 'Fly']
        });
        const json = team.toJSON();
        assert.strictEqual(json.invited, false);
    });

});