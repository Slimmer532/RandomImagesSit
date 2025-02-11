const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static('public'));
app.use('/Images', express.static(path.join(__dirname, 'Images')));

// Function to get random file from a directory
function getRandomFile(dir) {
    const files = fs.readdirSync(dir);
    if (files.length === 0) return null;
    return files[Math.floor(Math.random() * files.length)];
}

// API endpoint for random images
app.get('/random-image/:category', (req, res) => {
    const category = req.params.category;
    const categoryPath = path.join(__dirname, 'Images', category);

    if (!fs.existsSync(categoryPath)) {
        return res.status(404).json({ error: 'Category not found' });
    }

    const randomFile = getRandomFile(categoryPath);
    if (!randomFile) {
        return res.status(404).json({ error: 'No images found' });
    }

    res.json({ imageUrl: `/Images/${category}/${randomFile}` });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
