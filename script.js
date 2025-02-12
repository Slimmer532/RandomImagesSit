let images = [];
let currentCategory = "Valorant"; // Default category
let isImageVisible = false; // Image hidden by default

async function fetchImages(category) {
    try {
        let response = await fetch(`https://api.github.com/repos/Slimmer532/RandomImagesSit/contents/images/${category}`);
        let data = await response.json();
        images = data.map(file => file.download_url); // Preload all image URLs
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

// Load Valorant images by default
fetchImages(currentCategory);

function showRandomImage() {
    if (images.length === 0) return;

    let randomIndex = Math.floor(Math.random() * images.length);
    let imageElement = document.getElementById("randomImage");
    imageElement.src = images[randomIndex];

    // Ensure image is visible
    let container = document.getElementById("imageContainer");
    container.style.display = "block";
    isImageVisible = true;
}

function hideImage() {
    let container = document.getElementById("imageContainer");
    container.style.display = isImageVisible ? "none" : "block";
    isImageVisible = !isImageVisible;
}

function changeCategory(category) {
    if (currentCategory !== category) {
        currentCategory = category;
        fetchImages(category);
    }
}

// Event listeners
document.getElementById("valorantButton").addEventListener("click", () => changeCategory("Valorant"));
document.getElementById("leagueButton").addEventListener("click", () => changeCategory("League"));
document.getElementById("toggleButton").addEventListener("click", hideImage);
document.addEventListener("keydown", (event) => {
    if (event.key === " ") showRandomImage(); // Press Space to change image quickly
});
