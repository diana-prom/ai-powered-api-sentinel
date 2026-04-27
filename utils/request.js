const request = require('supertest');
const { BASE_URL } = require('../config/api.config');

const api = request(BASE_URL);

// -------------------------
// Core wrapper
// -------------------------

const normalizeResponse = (res) => ({
  status: res.status,
  body: res.body,
  headers: res.headers,
});

// -------------------------
// Logging (simple but useful)
// -------------------------

const logRequest = (method, url, data) => {
  console.log(`\n[API REQUEST] ${method.toUpperCase()} ${url}`);
  if (data && Object.keys(data).length) {
    console.log('Payload/Query:', JSON.stringify(data, null, 2));
  }
};

// -------------------------
// Lightweight retry (SDET pattern for flaky APIs)
// -------------------------

const withRetry = async (fn, retries = 2) => {
  let lastError;

  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      console.log(`Retry attempt ${attempt} failed`);

      if (attempt > retries) throw lastError;
    }
  }
};

// -------------------------
// HTTP methods
// -------------------------

const get = async (url, query = {}) => {
  logRequest('get', url, query);

  return withRetry(async () => {
    const res = await api.get(url).query(query);
    return normalizeResponse(res);
  });
};

const post = async (url, body = {}) => {
  logRequest('post', url, body);

  return withRetry(async () => {
    const res = await api.post(url).send(body);
    return normalizeResponse(res);
  });
};

// -------------------------
// Export clean interface
// -------------------------

module.exports = {
  get,
  post,
};