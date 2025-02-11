const repoName = "your-repository"; // Change this to your actual GitHub repo name
const basePath = `https://your-username.github.io/${repoName}/images/`;

const images = {
    League: [`${basePath}League/image1.jpg`, `${basePath}League/image2.jpg`],
    Valorant: [`${basePath}Valorant/image1.png`, `${basePath}Valorant/image2.png`],
    LeagueGIF: [`${basePath}LeagueGIF/gif1.gif`, `${basePath}LeagueGIF/gif2.gif`],
    ValorantGIF: [`${basePath}ValorantGIF/gif1.gif`, `${basePath}ValorantGIF/gif2.gif`]
};

async function fetchImage(category) {
    try {
        const img = document.getElementById("randomImage");
        const video = document.getElementById("randomVideo");
        const imageBox = document.querySelector(".image-box");

        img.style.display = "none";
        video.style.display = "none";

        const randomIndex = Math.floor(Math.random() * images[category].length);
        const selectedFile = images[category][randomIndex];
        const fileExtension = selectedFile.split('.').pop().toLowerCase();

        if (fileExtension === 'gif' || fileExtension === 'mp4' || fileExtension === 'webm') {
            video.style.display = "block";
            video.src = selectedFile;
            video.load();
        } else {
            img.style.display = "block";
            img.src = selectedFile;
        }
    } catch (error) {
        console.error("Error fetching image:", error);
    }
}
