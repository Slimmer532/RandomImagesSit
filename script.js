async function fetchImage(category) {
    const basePath = "https://slimmer532.github.io/RandomImagesSit/Images/";

    const images = {
        League: [`${basePath}League/image1.jpg`, `${basePath}League/image2.jpg`],
        Valorant: [`${basePath}Valorant/image1.png`, `${basePath}Valorant/image2.png`],
        LeagueGIF: [`${basePath}LeagueGIF/gif1.gif`, `${basePath}LeagueGIF/gif2.gif`],
        ValorantGIF: [`${basePath}ValorantGIF/gif1.gif`, `${basePath}ValorantGIF/gif2.gif`]
    };

    if (!images[category]) {
        console.error("Category not found:", category);
        return;
    }

    // Pick a random image
    const randomIndex = Math.floor(Math.random() * images[category].length);
    const imageUrl = images[category][randomIndex];

    // Set the image source
    document.getElementById("randomImage").src = imageUrl;
}
