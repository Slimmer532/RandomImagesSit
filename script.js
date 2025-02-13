let currentCategory = "Valorant";
let history = [];
let preloadedImages = [];
let imageList = {};

// Unlock hidden category
document.getElementById("invisibleUnlock").addEventListener("click", function() {
    document.getElementById("aiGirlsButton").style.display = "inline-block";
});

async function fetchImageList(category) {
    let url = `https://api.github.com/repos/Slimmer532/RandomImagesSit/contents/images/${category}`;
    try {
        let response = await fetch(url);
        let data = await response.json();
        imageList[category] = data.map(file => file.name);
    } catch (error) {
        console.error("Error fetching image list:", error);
        imageList[category] = [];
    }
}

async function setCategory(category) {
    currentCategory = category;
    history = [];
    preloadedImages = [];
    document.getElementById("randomImage").style.display = "none";
    document.getElementById("hideButton").style.display = "none";

    if (!imageList[category]) {
        await fetchImageList(category);
    }
    preloadNextImages();
}

function getRandomImageUrl() {
    let files = imageList[currentCategory];
    if (!files || files.length === 0) return "";

    let randomFile = files[Math.floor(Math.random() * files.length)];
    return `https://raw.githubusercontent.com/Slimmer532/RandomImagesSit/main/images/${currentCategory}/${randomFile}`;
}

function preloadNextImages() {
    for (let i = 0; i < 3; i++) {
        let img = new Image();
        img.src = getRandomImageUrl();
        preloadedImages.push(img);
    }
}

function showRandomImage() {
    if (preloadedImages.length > 0) {
        let image = preloadedImages.shift();
        history.push(image.src);
        document.getElementById("randomImage").src = image.src;
        document.getElementById("randomImage").style.display = "block";
        document.getElementById("hideButton").style.display = "block";
        preloadNextImages();
    }
}

function toggleImage() {
    let img = document.getElementById("randomImage");
    img.style.display = img.style.display === "none" ? "block" : "none";
}

// Fetch images for default category
fetchImageList(currentCategory).then(preloadNextImages);
