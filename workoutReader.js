const fs = require("fs");
const csv = require("csv-parser");

// Reads workout data from a CSV file
async function workoutCalculator(filePath) {
    return new Promise((resolve, reject) => {
        const workouts = [];

        fs.createReadStream(filePath)
            .pipe(csv())

            // Store each row from the CSV file
            .on("data", (row) => {
                workouts.push(row);
            })

            // When finished reading the file
            .on("end", () => {
                let totalMinutes = 0;

                // Add up all workout minutes
                for (let i = 0; i < workouts.length; i++) {
                    totalMinutes += Number(workouts[i].minutes);
                }

                resolve({
                    totalWorkouts: workouts.length,
                    totalMinutes: totalMinutes
                });
            })

            // Handle file errors
            .on("error", (error) => {
                console.log("Error reading workout file.");
                reject(error);
            });
    });
}

module.exports = { workoutCalculator };