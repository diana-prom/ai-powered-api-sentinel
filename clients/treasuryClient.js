const request = require('supertest');
const { BASE_URL } = require('../config/api.config');

const api = request(BASE_URL);

const buildQueryString = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return query ? `?${query}` : '';
};

const getInterestRates = (params) => {
  return api.get(
    `/services/api/fiscal_service/v2/accounting/od/avg_interest_rates${buildQueryString(params)}`
  );
};

const getDebtToPenny = (params) => {
  return api.get(
    `/services/api/fiscal_service/v2/accounting/od/debt_to_penny${buildQueryString(params)}`
  );
};

module.exports = {
  getInterestRates,
  getDebtToPenny,
};