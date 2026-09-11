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
let activePetals = [];

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

// Scene 2 -> Scene 3 Transition
nextToScene3Btn.addEventListener("click", function () {
    triggerPetalTransition(() => {
        storySection.classList.remove("show");
        storySection.style.display = "none";
        gameSection.classList.add("show");
    });
});

// Cinematic Full-Screen Cherry Storm Transition
function triggerPetalTransition(callback) {
    petalTransition.innerHTML = "";
    const petalCount = window.innerWidth > 768 ? 80 : 45;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement("div");
        petal.classList.add("transition-petal");
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${1.2 + Math.random() * 1.2}s`;
        petal.style.animationDelay = `${Math.random() * 0.5}s`;
        petalTransition.appendChild(petal);
    }

    setTimeout(callback, 1100);

    setTimeout(() => {
        petalTransition.innerHTML = "";
    }, 2500);
}

// Start Game Prompt Action
startGameBtn.addEventListener("click", () => {
    preGamePrompt.classList.add("hidden");
    gamePlayArea.classList.remove("hidden");
    gamePlayArea.classList.add("fade-in");
    initRainbowGame();
});

/* ========================================
   SCENE 3: VIBGYOR RAINBOW SAKURA ENGINE
   ======================================== */

const compliments = [
    "Violet 💜 — Your grace and calm presence soothe my mind in every way.",
    "Indigo 💙 — The profound, gentle depth in the way you care about people.",
    "Blue 🩵 — How time completely dissolves when we talk for hours.",
    "Green 💚 — Your radiant smile instantly fills my life with comfort.",
    "Yellow 💛 — Your warm brightness turns my hardest days into light.",
    "Orange 🧡 — Every ordinary memory with you turns into pure gold.",
    "Red ❤️ — You are my favorite place to be, today and always."
];

const vibgyorColors = ["violet", "indigo", "blue", "green", "yellow", "orange", "red"];
let caughtCount = 0;

function initRainbowGame() {
    rainbowContainer.innerHTML = "";
    activePetals = [];
    caughtCount = 0;
    counterBadge.textContent = `Blossoms Caught: 0 / 7`;

    for (let i = 0; i < 7; i++) {
        const btn = document.createElement("button");
        btn.classList.add("rainbow-sakura", `vibgyor-${vibgyorColors[i]}`);
        btn.innerHTML = "🌸";
        btn.setAttribute("data-index", i);
        
        // Initial Screen Placement
        setRandomInitialPosition(btn);
        rainbowContainer.appendChild(btn);

        // Continuous Smooth Physics Motion
        const petalObj = {
            element: btn,
            interval: setInterval(() => glidePetal(btn), 900 + Math.random() * 400)
        };
        activePetals.push(petalObj);

        btn.addEventListener("click", () => handlePetalCatch(btn, i));
    }
}

function setRandomInitialPosition(element) {
    const marginX = 80;
    const marginY = 120;
    const startX = marginX + Math.random() * (window.innerWidth - marginX * 2);
    const startY = marginY + Math.random() * (window.innerHeight - marginY * 2);
    
    element.style.left = `${startX}px`;
    element.style.top = `${startY}px`;
    element.style.transform = `translate(0px, 0px) scale(1)`;
}

function glidePetal(element) {
    if (element.classList.contains("caught")) return;

    const currentLeft = parseFloat(element.style.left);
    const currentTop = parseFloat(element.style.top);

    const moveRangeX = window.innerWidth > 768 ? 240 : 130;
    const moveRangeY = window.innerHeight > 768 ? 200 : 110;

    let deltaX = (Math.random() - 0.5) * moveRangeX;
    let deltaY = (Math.random() - 0.5) * moveRangeY;

    if (currentLeft + deltaX < 60 || currentLeft + deltaX > window.innerWidth - 80) {
        deltaX *= -1;
    }
    if (currentTop + deltaY < 100 || currentTop + deltaY > window.innerHeight - 100) {
        deltaY *= -1;
    }

    element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${0.95 + Math.random() * 0.15})`;
}

function handlePetalCatch(btn, index) {
    if (btn.classList.contains("caught")) return;
    btn.classList.add("caught");
    
    btn.style.transform += " scale(1.6)";
    btn.style.opacity = "0";
    btn.style.pointerEvents = "none";

    caughtCount++;
    counterBadge.textContent = `Blossoms Caught: ${caughtCount} / 7`;

    complimentText.textContent = compliments[index];
    complimentModal.classList.remove("hidden");
    complimentModal.classList.add("fade-in");
}

continueGameBtn.addEventListener("click", () => {
    complimentModal.classList.add("hidden");
    complimentModal.classList.remove("fade-in");

    if (caughtCount === 7) {
        activePetals.forEach(p => clearInterval(p.interval));
        rainbowContainer.style.display = "none";
        gamePlayArea.style.display = "none";

        finalUnlockCard.classList.remove("hidden");
        finalUnlockCard.classList.add("fade-in");
    }
});

// Proposal Transition (Hooked directly to Scene 4)
congratsBtn.addEventListener("click", () => {
    gameSection.classList.remove("show");
    gameSection.classList.add("fade-out");
    setTimeout(() => {
        gameSection.style.display = "none";
        initScene4Puzzle();
    }, 800);
});

/* ========================================
   SCENE 4: SAKURA PETAL PUZZLE ENGINE
   ======================================== */

const scene4Qualities = ["Kind", "Beautiful", "Strong", "Funny", "Elegant"];
let uncaughtPetals = [];
let petalsCaughtCount = 0;

function initScene4Puzzle() {
    const scene4Section = document.getElementById("scene4Section");
    const floatingPetalsContainer = document.getElementById("floatingPetals");
    const attachedPetalsContainer = document.getElementById("attachedPetals");
    
    scene4Section.classList.add("show");
    floatingPetalsContainer.innerHTML = "";
    attachedPetalsContainer.innerHTML = "";
    uncaughtPetals = [];
    petalsCaughtCount = 0;

    scene4Qualities.forEach((quality, index) => {
        const petal = document.createElement("div");
        petal.classList.add("floating-petal");
        petal.setAttribute("data-quality", quality);
        petal.setAttribute("data-index", index);

        setRandomPuzzlePosition(petal);
        floatingPetalsContainer.appendChild(petal);

        const petalObj = {
            element: petal,
            quality: quality,
            index: index,
            interval: setInterval(() => glideUncaughtPetal(petal), 1000 + Math.random() * 500)
        };

        uncaughtPetals.push(petalObj);

        petal.addEventListener("click", () => catchPuzzlePetal(petalObj));
    });
}

function setRandomPuzzlePosition(element) {
    const containerRadius = window.innerWidth > 480 ? 120 : 90;
    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * containerRadius;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    element.style.left = `calc(50% + ${x}px - 30px)`;
    element.style.top = `calc(50% + ${y}px - 30px)`;
}

function glideUncaughtPetal(element) {
    const maxOffset = window.innerWidth > 480 ? 40 : 25;
    const deltaX = (Math.random() - 0.5) * maxOffset;
    const deltaY = (Math.random() - 0.5) * maxOffset;

    element.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${45 + Math.random() * 20}deg)`;
}

function catchPuzzlePetal(petalObj) {
    clearInterval(petalObj.interval);
    petalObj.element.remove();

    petalsCaughtCount++;

    attachPetalToCenter(petalObj.quality, petalObj.index);

    if (petalsCaughtCount === 5) {
        completeSakuraPuzzle();
    }
}

function attachPetalToCenter(quality, index) {
    const attachedPetalsContainer = document.getElementById("attachedPetals");
    const attachedPetal = document.createElement("div");
    attachedPetal.classList.add("attached-petal");

    const angle = (index * 72 - 90) * (Math.PI / 180);
    const radius = window.innerWidth > 480 ? 85 : 68;

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    attachedPetal.style.left = `calc(50% + ${x}px - 35px)`;
    attachedPetal.style.top = `calc(50% + ${y}px - 35px)`;
    attachedPetal.style.transform = `rotate(${index * 72 + 45}deg)`;

    const label = document.createElement("span");
    label.classList.add("petal-label");
    label.textContent = quality;
    attachedPetal.appendChild(label);

    attachedPetalsContainer.appendChild(attachedPetal);
}

function completeSakuraPuzzle() {
    const sakuraPuzzleContainer = document.getElementById("sakuraPuzzleContainer");
    const scene4Completion = document.getElementById("scene4Completion");

    setTimeout(() => {
        sakuraPuzzleContainer.classList.add("golden-completed");

        scene4Completion.classList.remove("hidden");
        scene4Completion.classList.add("fade-in");
    }, 600);
}

// Scene 4 -> Scene 5 Hook
document.body.addEventListener("click", (e) => {
    if (e.target && e.target.id === "readyForItBtn") {
        const scene4Section = document.getElementById("scene4Section");
        scene4Section.classList.remove("show");
        scene4Section.classList.add("fade-out");

        setTimeout(() => {
            scene4Section.style.display = "none";
            // Scene 5 code ready to hook here
        }, 800);
    }
});
