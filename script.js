async function fetchImage(category) {
    try {
        const img = document.getElementById("randomImage");
        const imagePath = `https://slimmer532.github.io/RandomImagesSit/images/${category}/image1.jpg`; // Change this dynamically

        img.src = imagePath;
    } catch (error) {
        console.error("Error fetching image:", error);
    }
}
