const beginButton = document.getElementById("beginButton");
const introContainer = document.getElementById("introContainer");
const storySection = document.getElementById("storySection");

const scene2Intro = document.getElementById("scene2Intro");
const sakuraBtn = document.getElementById("sakuraBtn");
const poemContainer = document.getElementById("poemContainer");
const nextToScene3Btn = document.getElementById("nextToScene3Btn");

const petalTransition = document.getElementById("petalTransition");
const gameSection = document.getElementById("gameSection");

const preGamePrompt = document.getElementById("preGamePrompt");
const startGameBtn = document.getElementById("startGameBtn");
const gamePlayArea = document.getElementById("gamePlayArea");

const rainbowContainer = document.getElementById("rainbowContainer");
const counterBadge = document.getElementById("counter");

const complimentModal = document.getElementById("complimentModal");
const complimentText = document.getElementById("complimentText");
const continueGameBtn = document.getElementById("continueGameBtn");

const finalUnlockCard = document.getElementById("finalUnlockCard");
const congratsBtn = document.getElementById("congratsBtn");

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

// Scene 2 Sakura Float
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

// Catching Scene 2 Sakura
sakuraBtn.addEventListener("click", function () {
    clearInterval(moveInterval);
    scene2Intro.style.display = "none";
    poemContainer.classList.remove("hidden");
    poemContainer.classList.add("fade-in");
});

// Scene 2 -> Scene 3 (Full-Screen Sakura Burst Transition)
nextToScene3Btn.addEventListener("click", function () {
    triggerPetalTransition(() => {
        storySection.classList.remove("show");
        storySection.style.display = "none";
        gameSection.classList.add("show");
    });
});

// Full-screen Burst Effect for Mobile & Laptop
function triggerPetalTransition(callback) {
    petalTransition.innerHTML = "";
    const petalCount = window.innerWidth > 768 ? 70 : 40;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement("div");
        petal.classList.add("transition-petal");
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${1.0 + Math.random() * 1.0}s`;
        petal.style.animationDelay = `${Math.random() * 0.4}s`;
        petalTransition.appendChild(petal);
    }

    setTimeout(callback, 1000);

    setTimeout(() => {
        petalTransition.innerHTML = "";
    }, 2200);
}

// Start Game from Scene 3 Prompt
startGameBtn.addEventListener("click", () => {
    preGamePrompt.classList.add("hidden");
    gamePlayArea.classList.remove("hidden");
    gamePlayArea.classList.add("fade-in");
    initRainbowGame();
});

/* ========================================
   SCENE 3: VIBGYOR RAINBOW SAKURA GAME
   ======================================== */

const compliments = [
    "Violet 💜 — Your grace and gentle energy make every moment feel peaceful.",
    "Indigo 💙 — The deep, thoughtful way you care for everyone around you.",
    "Blue 🩵 — How effortless it is to talk to you for hours about anything.",
    "Green 💚 — Your smile always brings fresh joy into my life.",
    "Yellow 💛 — Your radiant warmth literally brightens up my worst days.",
    "Orange 🧡 — Every simple memory with you becomes my instant favorite.",
    "Red ❤️ — Just being near you makes my whole world complete."
];

// 7 VIBGYOR Palette
const vibgyorColors = ["violet", "indigo", "blue", "green", "yellow", "orange", "red"];
let caughtCount = 0;
let rainbowIntervals = [];

function initRainbowGame() {
    rainbowContainer.innerHTML = "";
    caughtCount = 0;
    counterBadge.textContent = `Blossoms Caught: 0 / 7`;

    for (let i = 0; i < 7; i++) {
        const btn = document.createElement("button");
        btn.classList.add("rainbow-sakura", `vibgyor-${vibgyorColors[i]}`);
        btn.innerHTML = "🌸";
        btn.setAttribute("data-index", i);
        
        // Initial positioning
        positionRandomly(btn);
        rainbowContainer.appendChild(btn);

        // Smooth 1.4s movement timing (slower & cleaner across all screens)
        const interval = setInterval(() => {
            moveSmooth(btn);
        }, 1400);

        rainbowIntervals.push(interval);

        btn.addEventListener("click", () => handlePetalCatch(btn, i));
    }
}

function positionRandomly(element) {
    const paddingX = 80;
    const paddingY = 160;
    const x = paddingX + Math.random() * (window.innerWidth - paddingX * 2);
    const y = paddingY + Math.random() * (window.innerHeight - paddingY * 2);
    
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
}

function moveSmooth(element) {
    if (element.classList.contains("caught")) return;
    
    const paddingX = 80;
    const paddingY = 160;
    const targetX = paddingX + Math.random() * (window.innerWidth - paddingX * 2);
    const targetY = paddingY + Math.random() * (window.innerHeight - paddingY * 2);

    const currentX = parseFloat(element.style.left) || window.innerWidth / 2;
    const currentY = parseFloat(element.style.top) || window.innerHeight / 2;

    const deltaX = targetX - currentX;
    const deltaY = targetY - currentY;

    element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
}

function handlePetalCatch(btn, index) {
    if (btn.classList.contains("caught")) return;
    btn.classList.add("caught");
    btn.style.opacity = "0";
    btn.style.pointerEvents = "none";

    caughtCount++;
    counterBadge.textContent = `Blossoms Caught: ${caughtCount} / 7`;

    // Show Compliment Modal
    complimentText.textContent = compliments[index];
    complimentModal.classList.remove("hidden");
    complimentModal.classList.add("fade-in");
}

continueGameBtn.addEventListener("click", () => {
    complimentModal.classList.add("hidden");
    complimentModal.classList.remove("fade-in");

    if (caughtCount === 7) {
        // Clear game area and reveal Golden Sakura Button
        rainbowIntervals.forEach(clearInterval);
        gamePlayArea.style.display = "none";

        finalUnlockCard.classList.remove("hidden");
        finalUnlockCard.classList.add("fade-in");
    }
});

// Scene 3 -> Scene 4 Proposal Trigger
congratsBtn.addEventListener("click", () => {
    gameSection.classList.remove("show");
    gameSection.classList.add("fade-out");
    setTimeout(() => {
        gameSection.style.display = "none";
        // Final proposal scene trigger goes here!
    }, 800);
});
