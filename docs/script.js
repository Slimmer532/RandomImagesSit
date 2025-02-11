async function fetchImage(category) {
    try {
        const response = await fetch(`/random-image/${category}`);
        const data = await response.json();

        const img = document.getElementById("randomImage");
        const video = document.getElementById("randomVideo");
        const imageBox = document.querySelector(".image-box");

        img.style.display = "none";
        video.style.display = "none";

        const fileUrl = data.imageUrl;
        const fileExtension = fileUrl.split('.').pop().toLowerCase();

        if (fileExtension === 'gif' || fileExtension === 'jpg' || fileExtension === 'png') {
            img.style.display = "block";
            img.src = fileUrl;
        } else if (fileExtension === 'webm' || fileExtension === 'mp4') {
            video.style.display = "block";
            video.src = fileUrl;
            video.play();
        }
    } catch (error) {
        console.error("Error fetching image:", error);
    }
}
