const images = {
    League: ["images/League/image1.jpg", "images/League/image2.jpg"],
    Valorant: ["images/Valorant/image1.png", "images/Valorant/image2.png"],
    LeagueGIF: ["images/LeagueGIF/gif1.gif", "images/LeagueGIF/gif2.gif"],
    ValorantGIF: ["images/ValorantGIF/gif1.gif", "images/ValorantGIF/gif2.gif"]
};

const history = {
    League: [],
    Valorant: [],
    LeagueGIF: [],
    ValorantGIF: []
};

const historyLimit = 10;

function fetchImage(category) {
    const imgElement = document.getElementById("randomImage");
    const videoElement = document.getElementById("randomVideo");
    const imageBox = document.querySelector(".image-box");

    if (!images[category] || images[category].length === 0) return;

    // Get images that were not shown in the last `historyLimit` rolls
    let availableImages = images[category].filter(img => !history[category].includes(img));

    if (availableImages.length === 0) {
        history[category] = []; // Reset history if all images were used
        availableImages = [...images[category]];
    }

    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const selectedImage = availableImages[randomIndex];

    history[category].push(selectedImage);
    if (history[category].length > historyLimit) history[category].shift(); // Keep history limited

    // Reset display
    imgElement.style.display = "none";
    videoElement.style.display = "none";

    const fileExtension = selectedImage.split('.').pop().toLowerCase();

    if (fileExtension === 'gif' || fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg') {
        imgElement.src = selectedImage;
        imgElement.style.display = "block";
    } else if (fileExtension === 'webm' || fileExtension === 'mp4') {
        videoElement.src = selectedImage;
        videoElement.style.display = "block";
    }

    // Resize container
    setTimeout(() => {
        const newWidth = Math.max(imgElement.naturalWidth || videoElement.videoWidth, 500);
        const newHeight = Math.max(imgElement.naturalHeight || videoElement.videoHeight, 500);

        imageBox.style.width = `${Math.min(newWidth, window.innerWidth * 0.8)}px`;
        imageBox.style.height = `${Math.min(newHeight, window.innerHeight * 0.8)}px`;
    }, 100);
}
