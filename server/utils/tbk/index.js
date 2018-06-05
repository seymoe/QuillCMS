'use strict';

var apiClient = require('./lib/api/topClient.js').TopClient;
var tmcClient = require('./lib/tmc/tmcClient.js').TmcClient;

module.exports = {
    ApiClient: apiClient,
    TmcClient: tmcClient
};
