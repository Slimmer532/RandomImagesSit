const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static("public")); // Serve HTML, CSS, JS
app.use("/images", express.static("images")); // Serve images

// Store last 10 images for each category
const lastImages = {
    League: [],
    Valorant: [],
    LeagueGIF: [],
    ValorantGIF: []
};

// Function to get a non-repeating random image
function getRandomImage(category) {
    const dirPath = path.join(__dirname, "images", category);
    if (!fs.existsSync(dirPath)) return null;

    const files = fs.readdirSync(dirPath).filter(file => /\.(jpg|jpeg|png|gif|webm|mp4)$/i.test(file));
    if (files.length === 0) return null;

    // Filter out last 10 shown images
    let availableFiles = files.filter(file => !lastImages[category].includes(file));
    
    // If all images have been used, reset history
    if (availableFiles.length === 0) {
        lastImages[category] = [];
        availableFiles = files;
    }

    // Select a random file
    const randomFile = availableFiles[Math.floor(Math.random() * availableFiles.length)];
    
    // Update history
    lastImages[category].push(randomFile);
    if (lastImages[category].length > 10) lastImages[category].shift(); // Keep only last 10

    return `/images/${category}/${randomFile}`;
}

// Endpoint to get a random image
app.get("/random-image/:category", (req, res) => {
    const category = req.params.category;
    if (!lastImages[category]) {
        return res.status(404).json({ error: "Invalid category" });
    }

    const imageUrl = getRandomImage(category);
    if (!imageUrl) {
        return res.status(404).json({ error: "No images found" });
    }

    res.json({ imageUrl });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
