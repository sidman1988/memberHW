const uuid = require('uuid');
const AWS = require('aws-sdk'); 

/*
This is the dynamicdb data source that accesses data on a dynamicdb on azure
*/
module.exports = class dynamicDbData {
    constructor() {
        this.dynamoDb = new AWS.DynamoDB.DocumentClient();
    }

    /*
    Saves a new item to dynamicdb for the given table
    */
    putItem(obj, tableName) {
        const itemInfo = {
            TableName: tableName,
            Item: obj,
        };
        return this.dynamoDb.put(itemInfo).promise().then(result => itemInfo);
    }

    /*
    Update an existing item in dynamicdb for the given table
    */
    updateItem(obj, tableName) {
        let attrValues = {};
        var updateString = 'set ';
        var isFirst = true;
        for (var prop in obj) {
            if (prop.toLowerCase() != 'id' && obj[prop]) {
                attrValues[`:${prop}`] = `${obj[prop]}`;
                if (isFirst) {
                    updateString += `${prop} = :${prop}`;
                    isFirst = false;
                } else {
                    updateString += `, ${prop} = :${prop}`;
                }
            }
        }

        return new Promise((resolve, reject) => {
            var params = {
                TableName:tableName,
                Key:{
                    "id": obj.id
                },
                UpdateExpression: updateString,
                ExpressionAttributeValues:attrValues,
                ReturnValues:"UPDATED_NEW"
            };
            
            this.dynamoDb.update(params, function(err, data) {
                if (err) {
                    reject("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                   resolve(data);
                }
            });
        });
    }

    /*
    Gets an existing item from dynamicdb for the given table
    */
    getItem(id, tableName) {
        const params = {
            TableName: tableName,
            Key: {
                id: id,
            }
        };
        return this.dynamoDb.get(params).promise().then(result => result.Item);
    }

    /*
    Gets all items from dynamicdb for the given table
    */

    getItems(tableName) {
        return new Promise((resolve, reject) => {
            const params = {
                TableName: tableName
            };

            var results = [];

            const onScan = (err, data) => {
                if (err) {
                    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                    resolve(null);
                } else {
                    data.Items.forEach(function(item) {
                        results.push(item);
                    });

                    // continue scanning if we have more movies, because
                    // scan can retrieve a maximum of 1MB of data
                    if (typeof data.LastEvaluatedKey != "undefined") {
                        console.log("Scanning for more...");
                        params.ExclusiveStartKey = data.LastEvaluatedKey;
                        docClient.scan(params, onScan);
                    } else {
                        resolve(results);
                    }
                }
            };

            this.dynamoDb.scan(params, onScan);
        });
    }

    /*
    Removes an item from dynamicdb for the given table
    */
    removeItem(id, tableName) {
        return new Promise((resolve, reject) => {
            var params = {
                TableName:tableName,
                Key:{
                    "id": id
                }
            };
            this.dynamoDb.delete(params, function(err, data) {
                if (err) {
                    reject("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    resolve(true);
                }
            });
        });
    }
}