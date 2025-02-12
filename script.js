async function fetchImage(category) {
    const images = {
        League: ["Images/League/image1.jpg", "Images/League/image2.jpg"],
        Valorant: ["Images/Valorant/image1.png", "Images/Valorant/image2.png"],
        LeagueGIF: ["Images/LeagueGIF/gif1.gif", "Images/LeagueGIF/gif2.gif"],
        ValorantGIF: ["Images/ValorantGIF/gif1.gif", "Images/ValorantGIF/gif2.gif"]
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
    // Pick a random image from the selected category
    const randomIndex = Math.floor(Math.random() * images[category].length);
    document.getElementById("randomImage").src = images[category][randomIndex];
}
