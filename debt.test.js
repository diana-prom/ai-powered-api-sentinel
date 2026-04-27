const request = require('supertest');

describe('US Treasury API - Average Interest Rates', () => {
  let response;

  beforeAll(async () => {
    response = await request('https://api.fiscaldata.treasury.gov')
      .get('/services/api/fiscal_service/v2/accounting/od/avg_interest_rates')
      .set('Accept', 'application/json');
  });

  it('should return 200 OK and valid response structure', () => {
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should validate data schema fields', () => {
    const record = response.body.data[0];
    expect(record).toHaveProperty('avg_interest_rate_amt');
    expect(typeof record.avg_interest_rate_amt).toBe('string');
  });

  it('should return 400 for invalid filter (negative test)', async () => {
    const res = await request('https://api.fiscaldata.treasury.gov')
      .get('/services/api/fiscal_service/v2/accounting/od/avg_interest_rates?filter=invalid:eq:1');

    expect(res.status).toBe(400);
  });
});