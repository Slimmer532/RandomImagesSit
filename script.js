async function getRandomImage() {
    const repo = "RandomImagesSit";
    const user = "Slimmer532";
    const folder = "images/Valorant"; // Change to "images/League" if needed
    const apiUrl = `https://api.github.com/repos/${user}/${repo}/contents/${folder}`;

    try {
        let response = await fetch(apiUrl);
        let files = await response.json();

        // Check if API response is valid
        if (!Array.isArray(files)) {
            console.error("API response is not an array:", files);
            return;
        }

        // Extract image URLs
        let images = files.map(file => file.download_url);

        // Pick a random image
        let randomIndex = Math.floor(Math.random() * images.length);
        let randomImageUrl = images[randomIndex];

        // Set image source
        document.getElementById("randomImage").src = randomImageUrl;
    } catch (error) {
        console.error("Error loading images:", error);
    }
}

// Run the function when the page loads
window.onload = getRandomImage;
