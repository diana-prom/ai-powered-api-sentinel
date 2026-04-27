const { getInterestRates } = require('../../clients/treasuryClient');
const { InterestRateSchema } = require('../../validators/interestRate.schema');

describe('US Treasury API - Interest Rates', () => {
  let response;

  beforeAll(async () => {
    response = await getInterestRates();
  });

  it('should return 200 and valid structure', () => {
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should match schema (contract validation)', () => {
    const firstRecord = response.body.data[0];
    const result = InterestRateSchema.safeParse(firstRecord);

    expect(result.success).toBe(true);
  });

  it('should return 400 for invalid filter (negative test)', async () => {
    const res = await getInterestRates({
      filter: 'invalid:eq:1',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(`Invalid query parameter: Field 'invalid' does not exist. For more information, please see the documentation.`);

  });
});