const beginButton = document.getElementById("beginButton");
const introContainer = document.getElementById("introContainer");
const storySection = document.getElementById("storySection");

const scene2Intro = document.getElementById("scene2Intro");
const sakuraBtn = document.getElementById("sakuraBtn");
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

// Catching the Sakura — Immediate & clean hide
sakuraBtn.addEventListener("click", function () {
    clearInterval(moveInterval);
    
    // Hide the entire intro text block instantly from DOM flow
    scene2Intro.style.display = "none";

    // Unhide the poem block and animate its reveal
    poemContainer.classList.remove("hidden");
    poemContainer.classList.add("fade-in");
});

// Scene 2 -> Scene 3
nextToScene3Btn.addEventListener("click", function () {
    storySection.classList.remove("show");
    storySection.classList.add("fade-out");

    setTimeout(() => {
        storySection.style.display = "none";
    }, 800);
});
