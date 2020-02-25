/*
This is a data source that just stores mock in memory, 
this will just be used for testing mode only
*/

module.exports = class memoryData {

    constructor() {
        this.data = {};
    }

    putItem(obj, tableName) {
        if (!this.data[tableName]) {
            this.data[tableName] = [];
        }

        this.data[tableName].push(obj);
        return obj;
    }

    updateItem(obj, tableName) {
        this.removeItem(obj.id, tableName);
        return this.putItem(obj, tableName);
    }

    getItem(id, tableName) {
        if (!this.data[tableName]) {
            this.data[tableName] = [];
        }

        var item = null;
        for (var i = 0; i < this.data[tableName].length; i++) {
            if (this.data[tableName][i].id == id) {
                item = this.data[tableName][i];
            }
        }

        return item;
    }

    getItems(tableName) {
        if (!this.data[tableName]) {
            this.data[tableName] = [];
        }

        return this.data[tableName];
    }

    removeItem(id, tableName) {
        if (!this.data[tableName]) {
            this.data[tableName] = [];
        }

        var itemToRemove = null;
        for (var i = 0; i < this.data[tableName].length; i++) {
            if (this.data[tableName][i].id == id) {
                itemToRemove = this.data[tableName][i];
            }
        }

        if (itemToRemove) {
            this.data[tableName].splice(this.data[tableName].indexOf(itemToRemove), 1);
        }

        return true;
    }
}