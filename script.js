async function getImages(folder) {
    const repo = "RandomImagesSit";
    const user = "Slimmer532";
    const apiUrl = `https://api.github.com/repos/${user}/${repo}/contents/images/${folder}`;
    
    try {
        let response = await fetch(apiUrl);
        let files = await response.json();
        let images = files.map(file => file.download_url);
        return images;
    } catch (error) {
        console.error("Error loading images:", error);
        return [];
    }
}

async function getRandomImage() {
    const folders = ["Valorant", "League"];
    const folder = folders[Math.floor(Math.random() * folders.length)];
    let images = await getImages(folder);

    if (images.length > 0) {
        let randomIndex = Math.floor(Math.random() * images.length);
        document.getElementById("randomImage").src = images[randomIndex];
    } else {
        console.error("No images found.");
    }
}
