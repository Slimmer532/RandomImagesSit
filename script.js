async function fetchImagesFromGitHub(game) {
    const apiUrl = `https://api.github.com/repos/Slimmer532/RandomImagesSit/contents/images/${game}`;

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();

        if (!Array.isArray(data)) {
            console.error(`Failed to load images for ${game}`);
            return;
        }

        let images = data
            .filter(file => file.name.match(/\.(jpg|jpeg|png|gif)$/i)) // Only image files
            .map(file => file.download_url); // Extract direct image URLs

        if (images.length === 0) {
            console.error(`No images found for ${game}`);
            return;
        }

        // Pick a random image
        let randomIndex = Math.floor(Math.random() * images.length);
        document.getElementById("randomImage").src = images[randomIndex];

    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

// Default game (you can change this to "League" if needed)
fetchImagesFromGitHub("Valorant");
