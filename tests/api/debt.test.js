const { getDebtToPenny } = require('../../clients/treasuryClient');

describe('US Treasury API - Debt to Penny', () => {
  it('should return 200 and data array', async () => {
    const response = await getDebtToPenny();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});