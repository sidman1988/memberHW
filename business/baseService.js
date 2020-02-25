const baseData = require('../data/baseData');

module.exports = class baseService {
    constructor() {
        this.baseData = new baseData();
    }

    /*
    Gets a new action result which has success indicator and a result and message (if it was not successfull)
    */
    getNewActionResult(isSuccess, data, message) {
        return  {
            success: isSuccess,
            message: JSON.stringify(message),
            result: data
        };
    }
}