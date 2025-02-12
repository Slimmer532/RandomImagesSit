const images = {
    "League": ["Images/League/image1.jpg", "Images/League/image2.jpg"],
    "Valorant": ["Images/Valorant/image1.png", "Images/Valorant/image2.png"],
    "LeagueGIF": ["Images/LeagueGIF/gif1.gif", "Images/LeagueGIF/gif2.gif"],
    "ValorantGIF": ["Images/ValorantGIF/gif1.gif", "Images/ValorantGIF/gif2.gif"]
};

async function fetchImage(category) {
    if (!images[category]) {
        console.error("Category not found:", category);
        return;
    }

    const randomIndex = Math.floor(Math.random() * images[category].length);
    const randomFile = images[category][randomIndex];

    const img = document.getElementById("randomImage");
    const video = document.getElementById("randomVideo");
    const imageBox = document.querySelector(".image-box");

    // Reset visibility
    img.style.display = "none";
    video.style.display = "none";

    // Construct the correct path for GitHub Pages
    const fullPath = `${window.location.origin}/${randomFile}`;

    if (randomFile.endsWith(".gif") || randomFile.endsWith(".jpg") || randomFile.endsWith(".png")) {
        img.src = fullPath;
        img.style.display = "block";
    } else if (randomFile.endsWith(".mp4") || randomFile.endsWith(".webm")) {
        video.src = fullPath;
        video.style.display = "block";
    }
}
