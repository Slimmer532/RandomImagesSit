let currentCategory = "Valorant";
let history = [];
let preloadedImages = [];

document.getElementById("invisibleUnlock").addEventListener("click", function() {
    document.getElementById("aiGirlsButton").style.display = "inline-block";
});

function setCategory(category) {
    currentCategory = category;
    history = [];
    preloadedImages = [];
    document.getElementById("randomImage").style.display = "none";
    document.getElementById("hideButton").style.display = "none";
    preloadNextImages();
}

function getRandomImageUrl() {
    return `https://raw.githubusercontent.com/Slimmer532/RandomImagesSit/main/images/${currentCategory}/` + generateRandomString() + ".jpg";
}

function generateRandomString() {
    return Math.random().toString(36).substring(2, 15);
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
