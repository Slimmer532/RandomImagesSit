let currentCategory = "Valorant";
let history = [];
let preloadedImages = [];
let imageList = [];

document.getElementById("invisibleUnlock").addEventListener("click", function() {
    document.getElementById("aiGirlsButton").style.display = "inline-block";
});

// 🔄 Load Image List on Page Load
function loadImageList() {
    let apiUrl = `https://api.github.com/repos/Slimmer532/RandomImagesSit/contents/images/${currentCategory}`;
    
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        imageList = data.map(file => file.download_url); // ✅ Get direct links
        preloadNextImages();
    })
    .catch(error => console.error("❌ Error fetching images:", error));
}

// 🎲 Pick a Random Image from List
function showRandomImage() {
    if (imageList.length === 0) {
        console.error("❌ No images loaded. Check API response.");
        return;
    }
    
    let randomIndex = Math.floor(Math.random() * imageList.length);
    let imageUrl = imageList[randomIndex];

    history.push(imageUrl);
    document.getElementById("randomImage").src = imageUrl;
    document.getElementById("randomImage").style.display = "block";
    document.getElementById("hideButton").style.display = "block";
}

// 🔄 Preload Next 3 Images
function preloadNextImages() {
    preloadedImages = [];
    for (let i = 0; i < 3; i++) {
        let img = new Image();
        img.src = imageList[Math.floor(Math.random() * imageList.length)];
        preloadedImages.push(img);
    }
}

// 🛠 Initialize
loadImageList();
