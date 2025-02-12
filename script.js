function fetchImage(category) {
    const images = {
        Valorant: [
            "images/Valorant/valorant1.jpg",
            "images/Valorant/valorant2.jpg",
            "images/Valorant/valorant3.jpg"
        ],
        League: [
            "images/League/league1.jpg",
            "images/League/league2.jpg",
            "images/League/league3.jpg"
        ]
    };

    if (!images[category]) return;

    const randomIndex = Math.floor(Math.random() * images[category].length);
    document.getElementById("randomImage").src = images[category][randomIndex];
}
