async function fetchImagesFromGitHub(game) {
    const apiUrl = `https://api.github.com/repos/Slimmer532/RandomImagesSit/contents/images/${game}`;

    console.log(`Fetching images from: ${apiUrl}`); // Debug log

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();

        if (!Array.isArray(data)) {
            console.error(`⚠️ Error: Could not load images for ${game}`);
            return;
        }

        let images = data
            .filter(file => file.name.match(/\.(jpg|jpeg|png|gif)$/i))
            .map(file => file.download_url);

        if (images.length === 0) {
            console.error(`⚠️ No images found for ${game}`);
            return;
        }

        let randomIndex = Math.floor(Math.random() * images.length);
        document.getElementById("randomImage").src = images[randomIndex];
        console.log(`✅ Loaded image: ${images[randomIndex]}`);

    } catch (error) {
        console.error("🚨 Fetch error:", error);
    }
}

// Test League manually
fetchImagesFromGitHub("League");
