const imageFolders = {
    "Valorant": "images/Valorant",
    "League": "images/League"
};
let currentCategory = "Valorant"; // Default category
let imageList = [];

// Set category and reload images
function setCategory(category) {
    currentCategory = category;
    imageList = []; // Reset list
    loadRandomImage();
}

// Fetch images from the selected folder
async function fetchImages(folder) {
    let response = await fetch(`https://api.github.com/repos/Slimmer532/RandomImagesSit/contents/${folder}`);
    let data = await response.json();
    return data.map(file => file.download_url);
}

// Load a random image
async function loadRandomImage() {
    let folder = imageFolders[currentCategory];

    if (imageList.length === 0) {
        imageList = await fetchImages(folder);
    }
    if (imageList.length > 0) {
        let randomIndex = Math.floor(Math.random() * imageList.length);
        document.getElementById("randomImage").src = imageList[randomIndex];
    }
}

// Toggle image visibility
function toggleImage() {
    let img = document.getElementById("randomImage");
    let btn = document.querySelector("button[onclick='toggleImage()']");
    
    if (img.style.display === "none") {
        img.style.display = "block";
        btn.textContent = "Hide Image";
    } else {
        img.style.display = "none";
        btn.textContent = "Show Image";
    }
}

// Load an image when the page opens
window.onload = loadRandomImage;
