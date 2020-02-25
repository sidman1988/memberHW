const uuid = require('uuid');
const baseService = require('./baseService');

/*
Business logic for membership users
*/
module.exports = class membershipService extends baseService {
    constructor() {
        super();
    }

    /*
    Creates a membership user
    */
    async create(member) {
        try {
            let dataObj = {
                firstName: member.firstName,
                lastName: member.lastName,
                email: member.email,
                id: uuid.v1()
            };

            await this.baseData.putItem(dataObj, process.env.MEMBERSHIP_TABLE);

            return this.getNewActionResult(true, dataObj);
        } catch (error) {
            return this.getNewActionResult(false, null, error);
        }
    }
    
    /*
    Updates a membership user for the given member id
    */

    async update(id, member) {
        try {
            let dataObj = {
                firstName: member.firstName,
                lastName: member.lastName,
                email: member.email,
                id: id
            };

            await this.baseData.updateItem(dataObj, process.env.MEMBERSHIP_TABLE);

            return this.getNewActionResult(true, dataObj);
        } catch (error) {
            return this.getNewActionResult(false, null, error.toString());
        }
    }

    /*
    Get all membership users
    */
    async getAll() {
        var results = await this.baseData.getItems(process.env.MEMBERSHIP_TABLE);
        if (results != null) {
            return this.getNewActionResult(true, results);
        } else {
            return this.getNewActionResult(false, null, 'There was an error retrieving the results');
        }
    }

    /*
    Get a membership user by idW
    */
    async getById(id) {
        var result = await this.baseData.getItem(id, process.env.MEMBERSHIP_TABLE);
        if (result != null) {
            return this.getNewActionResult(true, result);
        } else {
            return this.getNewActionResult(false, null, 'There was an error retrieving the results');
        }
    }

    /*
    Delete a membership user
    */
    async delete(id) {
        var result = await this.baseData.removeItem(id, process.env.MEMBERSHIP_TABLE);
        if (result) {
            return this.getNewActionResult(true, result);
        } else {
            return this.getNewActionResult(false, null, 'There was an error retrieving the results');
        }
    }
}