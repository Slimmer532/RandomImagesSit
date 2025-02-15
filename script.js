let currentCategory = "Valorant";
let history = [];
let preloadedImages = [];
let imageList = [];

document.getElementById("invisibleUnlock").addEventListener("click", function() {
    document.getElementById("aiGirlsButton").style.display = "inline-block";
});

// ✅ Load Image List from GitHub API
async function loadImageList() {
    let apiUrl = `https://api.github.com/repos/Slimmer532/RandomImagesSit/contents/images/${currentCategory}`;
    
    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (!Array.isArray(data)) {
            console.error("❌ GitHub API Error:", data);
            return;
        }

        imageList = data.map(file => file.download_url); // ✅ Get direct image links

        if (imageList.length > 0) {
            preloadNextImages();
        } else {
            console.error("❌ No images found in category:", currentCategory);
        }
    } catch (error) {
        console.error("❌ Error fetching images:", error);
    }
}

// 🎲 Pick a Random Image from List
function showRandomImage() {
    if (imageList.length === 0) {
        console.error("❌ No images loaded.");
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

// 🔘 Toggle Image Visibility
function toggleImage() {
    let img = document.getElementById("randomImage");
    img.style.display = img.style.display === "none" ? "block" : "none";
}

// 🛠 Initialize
loadImageList();
