const beginButton = document.getElementById("beginButton");
const introContainer = document.getElementById("introContainer");
const storySection = document.getElementById("storySection");

const sakuraBtn = document.getElementById("sakuraBtn");
const catchArea = document.getElementById("catchArea");
const poemContainer = document.getElementById("poemContainer");
const nextToScene3Btn = document.getElementById("nextToScene3Btn");

let moveInterval;

// Scene 1 -> Scene 2
beginButton.addEventListener("click", function () {
    introContainer.classList.add("fade-out");

    setTimeout(() => {
        introContainer.style.display = "none";
        storySection.classList.add("show");
        startSakuraFloating();
    }, 800);
});

// Random float animation logic for Sakura
function startSakuraFloating() {
    moveSakura();
    moveInterval = setInterval(moveSakura, 2000);
}

function moveSakura() {
    const maxX = Math.min(window.innerWidth - 80, 280);
    const maxY = Math.min(window.innerHeight - 80, 180);

    const randomX = (Math.random() - 0.5) * maxX;
    const randomY = (Math.random() - 0.5) * maxY;

    sakuraBtn.style.transform = `translate(${randomX}px, ${randomY}px) scale(1.1)`;
}

// Catching the Sakura
sakuraBtn.addEventListener("click", function () {
    clearInterval(moveInterval);
    
    catchArea.style.opacity = "0";
    catchArea.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
        catchArea.style.display = "none";
        poemContainer.classList.remove("hidden");
        poemContainer.classList.add("fade-in");
    }, 500);
});

// Scene 2 -> Scene 3
nextToScene3Btn.addEventListener("click", function () {
    storySection.classList.remove("show");
    storySection.classList.add("fade-out");

    setTimeout(() => {
        storySection.style.display = "none";
        // Ready for Scene 3 build!
    }, 800);
});
