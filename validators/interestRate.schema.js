const { z } = require('zod');

const InterestRateSchema = z.object({
    avg_interest_rate_amt: z.string(),
    record_date: z.string(),
});

module.exports = { InterstRatesSchema };