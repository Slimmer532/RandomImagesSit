let currentCategory = 'Valorant';

function setCategory(category) {
    currentCategory = category;
    loadRandomImage();
}

function loadRandomImage() {
    fetch(`https://api.github.com/repos/Slimmer532/RandomImagesSit/contents/images/${currentCategory}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) return;
            const randomIndex = Math.floor(Math.random() * data.length);
            const imageUrl = `https://raw.githubusercontent.com/Slimmer532/RandomImagesSit/main/${data[randomIndex].path}`;
            
            const img = document.getElementById("randomImage");
            img.src = imageUrl;
            img.style.display = "block";
            
            document.getElementById("hideButton").innerText = "Hide Image";
        })
        .catch(error => console.error("Error loading image:", error));
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
