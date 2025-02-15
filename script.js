let currentCategory = "Valorant";
let history = [];
let preloadedImages = [];
let imageList = {}; // Store filenames from JSON

// Fetch real filenames from JSON
fetch("https://raw.githubusercontent.com/Slimmer532/RandomImagesSit/main/images/imagelist.json")
    .then(response => response.json())
    .then(data => {
        imageList = data;
    })
    .catch(error => console.error("Error loading image list:", error));

// Hidden button unlocks "AiGirls"
document.getElementById("invisibleUnlock").addEventListener("click", function() {
    document.getElementById("aiGirlsButton").style.display = "inline-block";
});

// Set a new category
function setCategory(category) {
    currentCategory = category;
    history = [];
    preloadedImages = [];
    document.getElementById("randomImage").style.display = "none";
    document.getElementById("hideButton").style.display = "none";
    preloadNextImages();
}

// Get a random image URL from the JSON list
function getRandomImageUrl() {
    if (!imageList[currentCategory] || imageList[currentCategory].length === 0) return "";
    const images = imageList[currentCategory];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    return `https://raw.githubusercontent.com/Slimmer532/RandomImagesSit/main/images/${currentCategory}/${randomImage}`;
}

// Preload the next 3 images for smoother loading
function preloadNextImages() {
    for (let i = 0; i < 3; i++) {
        let img = new Image();
        img.src = getRandomImageUrl();
        preloadedImages.push(img);
    }
}

// Show a random preloaded image
function showRandomImage() {
    if (preloadedImages.length > 0) {
        let image = preloadedImages.shift();
        history.push(image.src);
        document.getElementById("randomImage").src = image.src;
        document.getElementById("randomImage").style.display = "block";
        document.getElementById("hideButton").style.display = "block";
        preloadNextImages(); // Preload more images
    }
}

// Show/hide image
function toggleImage() {
    let img = document.getElementById("randomImage");
    img.style.display = img.style.display === "none" ? "block" : "none";
}
