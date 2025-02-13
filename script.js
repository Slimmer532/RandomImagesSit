document.addEventListener("DOMContentLoaded", function () {
    let currentCategory = "Valorant";
    let images = [];
    let preloadedImages = [];
    let imageIndex = 0;

    function setCategory(category) {
        currentCategory = category;
        images = [];
        preloadedImages = [];
        imageIndex = 0;
        loadImages();
    }

    function loadImages() {
        fetch(`https://api.github.com/repos/Slimmer532/RandomImagesSit/contents/images/${currentCategory}`)
            .then(response => response.json())
            .then(data => {
                images = data.map(file => file.download_url);
                preloadNextImages();
            })
            .catch(error => console.error("Error loading images:", error));
    }

    function preloadNextImages() {
        preloadedImages = images.slice(imageIndex, imageIndex + 3).map(src => {
            let img = new Image();
            img.src = src;
            return img;
        });
    }

    function showNextImage() {
        if (imageIndex >= images.length) imageIndex = 0;
        document.getElementById("randomImage").src = images[imageIndex];
        document.getElementById("randomImage").style.display = "block";
        imageIndex++;
        preloadNextImages();
    }

    function toggleImage() {
        let img = document.getElementById("randomImage");
        let button = document.getElementById("hideButton");
        if (img.style.display === "none") {
            img.style.display = "block";
            button.innerText = "Hide Image";
            showNextImage();
        } else {
            img.style.display = "none";
            button.innerText = "Show Image";
        }
    }

    document.getElementById("valorantBtn").addEventListener("click", function () {
        setCategory('Valorant');
    });

    document.getElementById("leagueBtn").addEventListener("click", function () {
        setCategory('League');
    });

    document.getElementById("aiGirlsBtn").addEventListener("click", function () {
        setCategory('AiGirls');
    });

    document.getElementById("hideButton").addEventListener("click", function () {
        toggleImage();
    });

    document.getElementById("invisibleUnlock").addEventListener("click", function () {
        document.getElementById("aiGirlsBtn").style.display = "inline-block";
        alert("AiGirls category unlocked!");
    });

    setCategory('Valorant');
});
