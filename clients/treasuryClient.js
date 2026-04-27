const request = require('supertest');
const { BASE_URL } = require('../config/api.config');

const api = request(BASE_URL);

const getInterestRates = () => {
    return api.get('/services/api/fiscal_service/v2/accounting/od/avg_interest_rates');
};

const getDebtToPenny = () => {
    return api.get('/services/api/fiscal_service/v2/accounting/od/debt_to_penny');
};

module.exports = {
    getInterestRates,
    getDebtToPenny,
};