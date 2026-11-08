require("dotenv").config();

const { workoutCalculator } = require("./workoutReader");
const { healthMetricsCounter } = require("./healthReader");

// Runs both file readers and displays the results
async function processFiles() {
    try {

        // Display user's name from .env
        console.log("Processing data for:", process.env.USER_NAME);

        // Read workout data
        const workoutData = await workoutCalculator("./data/workouts.csv");

        // Read health data
        const healthData = await healthMetricsCounter("./data/health-metrics.json");

        // Display summary information
        console.log("\n=== SUMMARY ===");
        console.log("Workouts found:", workoutData.totalWorkouts);
        console.log("Total workout minutes:", workoutData.totalMinutes);
        console.log("Health entries found:", healthData.totalEntries);
        console.log("Weekly goal:", process.env.WEEKLY_GOAL);

        // Check if the weekly goal was reached
        if (workoutData.totalMinutes >= process.env.WEEKLY_GOAL) {
            console.log("Congratulations! You reached your weekly goal!");
        } else {
            console.log("Keep working toward your weekly goal!");
        }

    } catch (error) {

        // Display an error message if something goes wrong
        console.log("Error processing files.");
    }
}

// Start the program
processFiles();