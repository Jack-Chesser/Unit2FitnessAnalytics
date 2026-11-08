const { healthMetricsCounter } = require("../healthReader");

// Test if the file is read correctly
test("reads health data", async () => {
    const result = await healthMetricsCounter("./data/health-metrics.json");

    expect(result.totalEntries).toBe(8);
});

// Test if an error occurs with a bad file name
test("missing file", async () => {
    await expect(
        healthMetricsCounter("./data/fake.json")
    ).rejects.toThrow();
});

// Test that totalEntries exists
test("has totalEntries", async () => {
    const result = await healthMetricsCounter("./data/health-metrics.json");

    expect(result.totalEntries).toBeDefined();
});