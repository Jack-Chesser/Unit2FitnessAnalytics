const fs = require("fs").promises;

// Reads health data from a JSON file
async function healthMetricsCounter(filePath) {
    try {
        // Read the file
        const fileData = await fs.readFile(filePath, "utf8");

        // Convert JSON text into a JavaScript object
        const healthData = JSON.parse(fileData);

        // Count the number of health entries
        return {
            totalEntries: healthData.metrics.length
        };

    } catch (error) {
        // Handle errors if the file is missing or invalid
        console.log("Error reading health file.");
        throw error;
    }
}

module.exports = { healthMetricsCounter };