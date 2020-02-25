'use strict';

const apiHelper = require('./apiHelper');
const membershipService = require('../business/membershipService');

const service = new membershipService();

/*
Api hander to create a membership user, accepts a member in the body and returns the created member
*/
module.exports.create = async event => {
  let result = await service.create(JSON.parse(event.body));
  return apiHelper.getApiResponse(200, result);
};

/*
Api hander to update an existing membership user, accepts a member in the body, the member id in the url and returns the created member
*/
module.exports.update = async event => {
  let result = await service.update(event.pathParameters.id, JSON.parse(event.body));
  return apiHelper.getApiResponse(200, result);
};

/*
Api hander to get all membership users, returns a list of members
*/
module.exports.get = async event => {
  let result = await service.getAll();
  return apiHelper.getApiResponse(200, result);
};

/*
Api hander to get a membership user by id, returns a member
*/
module.exports.getById = async event => {
  let result = await service.getById(event.pathParameters.id);
  return apiHelper.getApiResponse(200, result);
};

/*
Api hander to delete a membership user
*/
module.exports.delete = async event => {
  let result = await service.delete(event.pathParameters.id);
  return apiHelper.getApiResponse(200, result);
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
