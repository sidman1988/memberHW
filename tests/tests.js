process.env.MEMBERSHIP_TABLE = 'OT_Membership';
process.env.DATASOURCE = 'Memory';

const assert = require('assert');
const membershipService = require('../business/membershipService');

let service = new membershipService();


describe('Membership', function() {

    describe('Create', async function() {
      it('Should exist after creating', async function() {
        var member = { firstName: 'John', lastName: 'Smith', email: 'jsmith@gmail.com' };
        var savedResult = await service.create(member);
        assert.equal(savedResult.success, true);
        assert.notEqual(savedResult.result, undefined);
        assert.notEqual(savedResult.result.id, undefined);
      });
    });


    describe('Get', async function() {
      it('Should be able to find item after creating', async function() {
        var member = { firstName: 'Bill', lastName: 'Johnson', email: 'bill@gmail.com' };
        var savedResult = await service.create(member);
        var retrievedResult = await service.getById(savedResult.result.id);

        assert.equal(retrievedResult.success, true);
        assert.equal(retrievedResult.result.firstName, 'Bill');
        assert.equal(retrievedResult.result.lastName, 'Johnson');
        assert.equal(retrievedResult.result.email, 'bill@gmail.com');
      });
    });

    describe('Update', async function() {
      it('Should be able to update an existing member', async function() {
        var member = { firstName: 'Craig', lastName: 'Smith', email: 'craig@gmail.com' };
        var savedResult = await service.create(member);
        member  = savedResult.result;
        member.firstName = 'Craig updated';
        var retrievedResult = await service.update(savedResult.result.id, member);

        assert.equal(retrievedResult.success, true);
        assert.equal(retrievedResult.result.firstName, 'Craig updated');
        assert.equal(retrievedResult.result.lastName, 'Smith');
        assert.equal(retrievedResult.result.email, 'craig@gmail.com');
      });
    });

    describe('Delete', async function() {
      it('Should be able to delete an existing member', async function() {
        var member = { firstName: 'Red', lastName: 'Blue', email: 'blue@gmail.com' };
        var savedResult = await service.create(member);

        var deleteResult = await service.delete(savedResult.result.id);
        assert.equal(deleteResult.success, true);

        var retrievedResult = await service.getById(savedResult.result.id);

        assert.equal(retrievedResult.success, false);
      });
    });

    describe('Get All', async function() {
      it('Should be able to retrieve all members', async function() {
        var getResult = await service.getAll();

        assert.equal(getResult.success, true);
        assert.equal(getResult.result.length, 3);
      });
    });
  });