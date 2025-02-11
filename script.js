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
        const response = await fetch('random-image.json'); // Load static file
        const data = await response.json();
        const images = data[category];
        const randomImage = images[Math.floor(Math.random() * images.length)];

        document.getElementById("randomImage").src = randomImage;
    } catch (error) {
        console.error("Error fetching image:", error);
    }
}
