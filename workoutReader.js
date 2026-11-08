const fs = require("fs");
const csv = require("csv-parser");

// Reads workout data from a CSV file
async function workoutCalculator(filePath) {
    return new Promise((resolve, reject) => {

        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            reject(new Error("File not found"));
            return;
        }

        const workouts = [];

        fs.createReadStream(filePath)
            .pipe(csv())

            // Save each workout row
            .on("data", (row) => {
                workouts.push(row);
            })

            // When the file is finished reading
            .on("end", () => {
                let totalMinutes = 0;

                // Add all workout durations together
                for (let i = 0; i < workouts.length; i++) {
                    totalMinutes += Number(workouts[i].duration);
                }

                resolve({
                    totalWorkouts: workouts.length,
                    totalMinutes: totalMinutes
                });
            })

            // Handle errors
            .on("error", (error) => {
                console.log("Error reading workout file.");
                reject(error);
            });
    });
}

module.exports = { workoutCalculator };