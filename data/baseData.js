/*
This is the main class that the business layer will communicate with,
it will determin which data repsitory to use
*/
module.exports = class baseData {
    constructor() {
        if (process.env.DATASOURCE == 'DynamoDb') {
            let dynamicDbData = require('./dynamicDbData');
            this.data = new dynamicDbData();
        } else if (process.env.DATASOURCE == 'Memory') {
            let memoryData = require('./memoryData');
            this.data = new memoryData();
        }
    }

    /*
    Stores an item to the selected data source
    */
    putItem(obj, tableName) {
        return this.data.putItem(obj, tableName);
    }

    /*
    Updates an item to the selected data source
    */
    updateItem(obj, tableName) {
        return this.data.updateItem(obj, tableName);
    }

    /*
    Gets an item from the selected data source
    */
    getItem(id, tableName) {
        return this.data.getItem(id, tableName);
    }

    /*
    Get all items from the selected data source
    */

    getItems(tableName) {
        return this.data.getItems(tableName);
    }

    /*
    Removes all items from the selected data source
    */
    removeItem(id, tableName) {
        return this.data.removeItem(id, tableName);
    }
}