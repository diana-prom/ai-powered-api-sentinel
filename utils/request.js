const request = require('supertest');
const { BASE_URL } = require('../config/api.config');

const api = request(BASE_URL);

modules.exports = api;