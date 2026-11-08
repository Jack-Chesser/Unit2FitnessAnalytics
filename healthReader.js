const fs = require("fs").promises;

async function healthMetricsCounter(filePath) {
    try {
        const fileData = await fs.readFile(filePath, "utf8");

        const healthData = JSON.parse(fileData);

        return {
            totalEntries: healthData.length
        };
    } catch (error) {
        console.log("Error reading health file.");
        throw error;
    }
}

module.exports = { healthMetricsCounter };