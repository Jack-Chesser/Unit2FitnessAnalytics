// Test your workoutReader.js module here
const { workoutCalculator } = require("../workoutReader");

// Test if the CSV file is read correctly
test("reads workout data", async () => {
    const result = await workoutCalculator("./data/workouts.csv");

    expect(result.totalWorkouts).toBe(10);
    expect(result.totalMinutes).toBe(330);
});

// Test for a missing file
test("missing file", async () => {
    await expect(
        workoutCalculator("./data/fake.csv")
    ).rejects.toThrow();
});

// Test that the returned values exist
test("returns workout information", async () => {
    const result = await workoutCalculator("./data/workouts.csv");

    expect(result.totalWorkouts).toBeDefined();
    expect(result.totalMinutes).toBeDefined();
});