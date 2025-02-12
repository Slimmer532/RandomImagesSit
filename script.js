let currentCategory = 'Valorant';
let imageHistory = [];
let historyIndex = -1;
let imageList = {};
let preloadQueue = []; // Stores preloaded images

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("valorantBtn").addEventListener("click", function () {
        setCategory('Valorant');
    });

    document.getElementById("leagueBtn").addEventListener("click", function () {
        setCategory('League');
    });

    document.getElementById("hideButton").addEventListener("click", function () {
        toggleImage();
    });

    document.getElementById("prevButton").addEventListener("click", function () {
        navigateHistory(-1);
    });

    document.getElementById("nextButton").addEventListener("click", function () {
        navigateHistory(1);
    });

    setCategory(currentCategory);
});

function setCategory(category) {
    currentCategory = category;
    preloadQueue = []; // Reset preloaded images

    if (!imageList[currentCategory]) {
        fetchImages();
    } else {
        preloadNextImages();
        loadNextPreloadedImage();
    }
}

function fetchImages() {
    fetch(`https://api.github.com/repos/Slimmer532/RandomImagesSit/contents/images/${currentCategory}`)
        .then(response => response.json())
        .then(data => {
            imageList[currentCategory] = data.map(img =>
                `https://raw.githubusercontent.com/Slimmer532/RandomImagesSit/main/${img.path}`
            );
            preloadNextImages();
            loadNextPreloadedImage();
        })
        .catch(error => console.error("Error loading images:", error));
}

function preloadNextImages() {
    if (!imageList[currentCategory] || imageList[currentCategory].length === 0) return;

    preloadQueue = [];
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * imageList[currentCategory].length);
        const imageUrl = imageList[currentCategory][randomIndex];

        const img = new Image();
        img.src = imageUrl;
        preloadQueue.push(imageUrl);
    }
}

function loadNextPreloadedImage() {
    if (preloadQueue.length === 0) {
        preloadNextImages(); // Ensure new images are loaded if queue is empty
    }

    const nextImageUrl = preloadQueue.shift();
    if (nextImageUrl) {
        updateHistory(nextImageUrl);
        displayImage(nextImageUrl);
    }
}

function updateHistory(imageUrl) {
    if (imageHistory.length >= 50) {
        imageHistory.shift();
    }
    imageHistory.push(imageUrl);
    historyIndex = imageHistory.length - 1;
}

function displayImage(imageUrl) {
    const img = document.getElementById("randomImage");

    img.src = "";
    setTimeout(() => {
        img.src = imageUrl;
    }, 50);

    img.style.display = "block";
    document.getElementById("hideButton").innerText = "Hide Image";
}

function toggleImage() {
    const img = document.getElementById("randomImage");
    const button = document.getElementById("hideButton");

    if (img.style.display === "none") {
        img.style.display = "block";
        button.innerText = "Hide Image";
    } else {
        img.style.display = "none";
        button.innerText = "Show Image";
    }
}

function navigateHistory(direction) {
    if (imageHistory.length === 0) return;

    historyIndex += direction;

    if (historyIndex < 0) {
        historyIndex = 0;
    } else if (historyIndex >= imageHistory.length) {
        historyIndex = imageHistory.length - 1;
    }

    displayImage(imageHistory[historyIndex]);
}
