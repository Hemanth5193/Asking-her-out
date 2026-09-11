/* ========================================
   GLOBAL DOM ELEMENTS & INITIAL SETUP
   ======================================== */
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

/* ========================================
   SCENE 1 -> SCENE 2 TRANSITION
   ======================================== */
beginButton.addEventListener("click", function () {
    introContainer.classList.add("fade-out");

    setTimeout(() => {
        introContainer.style.display = "none";
        storySection.classList.add("show");
        startSakuraFloating();
    }, 800);
});

/* ========================================
   SCENE 2: POEM & CHERRY STORM
   ======================================== */
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

sakuraBtn.addEventListener("click", function () {
    clearInterval(moveInterval);
    scene2Intro.style.display = "none";
    poemContainer.classList.remove("hidden");
    poemContainer.classList.add("fade-in");
});

nextToScene3Btn.addEventListener("click", function () {
    triggerPetalTransition(() => {
        storySection.classList.remove("show");
        storySection.style.display = "none";
        gameSection.classList.add("show");
    });
});

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

/* ========================================
   SCENE 3: FASTER VIBGYOR RAINBOW ENGINE
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

startGameBtn.addEventListener("click", () => {
    preGamePrompt.classList.add("hidden");
    gamePlayArea.classList.remove("hidden");
    gamePlayArea.classList.add("fade-in");
    initRainbowGame();
});

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
        
        setRandomInitialPosition(btn);
        rainbowContainer.appendChild(btn);

        // Faster glide interval (600ms - 900ms)
        const petalObj = {
            element: btn,
            interval: setInterval(() => glidePetal(btn), 600 + Math.random() * 300)
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

    const moveRangeX = window.innerWidth > 768 ? 320 : 180;
    const moveRangeY = window.innerHeight > 768 ? 260 : 150;

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

/* ========================================
   SCENE 4: COSMIC CONSTELLATION ENGINE
   ======================================== */
const proposalSection = document.getElementById("proposalSection");
const constellationStage = document.getElementById("constellationStage");
const starsContainer = document.getElementById("starsContainer");
const constellationCanvas = document.getElementById("constellationCanvas");
const constellationInstruction = document.getElementById("constellationInstruction");
const proposalCard = document.getElementById("proposalCard");
const yesBtn = document.getElementById("yesBtn");
const celebrationModal = document.getElementById("celebrationModal");

const ctx = constellationCanvas.getContext("2d");
let connectedStars = [];
let starNodes = [];

congratsBtn.addEventListener("click", () => {
    gameSection.classList.remove("show");
    gameSection.classList.add("fade-out");

    setTimeout(() => {
        gameSection.style.display = "none";
        proposalSection.classList.add("show");
        initConstellation();
    }, 800);
});

function initConstellation() {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    starsContainer.innerHTML = "";
    connectedStars = [];
    starNodes = [];

    const heartPoints = [
        { x: 50, y: 32 },
        { x: 35, y: 22 },
        { x: 22, y: 35 },
        { x: 32, y: 55 },
        { x: 50, y: 72 },
        { x: 68, y: 55 },
        { x: 78, y: 35 },
        { x: 65, y: 22 }
    ];

    heartPoints.forEach((point, index) => {
        const star = document.createElement("div");
        star.classList.add("cosmic-star");
        star.innerHTML = "✨";
        star.style.left = `${point.x}%`;
        star.style.top = `${point.y}%`;
        star.setAttribute("data-index", index);

        starsContainer.appendChild(star);
        starNodes.push({ element: star, xPercent: point.x, yPercent: point.y });

        star.addEventListener("click", () => handleStarTap(index));
    });
}

function resizeCanvas() {
    const rect = constellationStage.getBoundingClientRect();
    constellationCanvas.width = rect.width;
    constellationCanvas.height = rect.height;
    redrawLines();
}

function handleStarTap(index) {
    if (connectedStars.includes(index)) return;

    connectedStars.push(index);
    const star = starNodes[index].element;
    star.classList.add("activated");

    redrawLines();

    const remaining = starNodes.length - connectedStars.length;
    if (remaining > 0) {
        constellationInstruction.textContent = `${remaining} more star${remaining > 1 ? 's' : ''} to light up...`;
    } else {
        constellationInstruction.textContent = "The constellation is complete! ✨";
        setTimeout(revealProposalCard, 1000);
    }
}

function redrawLines() {
    ctx.clearRect(0, 0, constellationCanvas.width, constellationCanvas.height);
    if (connectedStars.length < 2) return;

    ctx.beginPath();
    const width = constellationCanvas.width;
    const height = constellationCanvas.height;

    const startNode = starNodes[connectedStars[0]];
    ctx.moveTo((startNode.xPercent / 100) * width, (startNode.yPercent / 100) * height);

    for (let i = 1; i < connectedStars.length; i++) {
        const node = starNodes[connectedStars[i]];
        ctx.lineTo((node.xPercent / 100) * width, (node.yPercent / 100) * height);
    }

    if (connectedStars.length === starNodes.length) {
        ctx.closePath();
    }

    ctx.strokeStyle = "rgba(255, 182, 193, 0.9)";
    ctx.lineWidth = 3;
    ctx.shadowColor = "#ff69b4";
    ctx.shadowBlur = 18;
    ctx.stroke();
}

function revealProposalCard() {
    constellationStage.classList.add("fade-out-fast");
    setTimeout(() => {
        constellationStage.style.display = "none";
        proposalCard.classList.remove("hidden");
        proposalCard.classList.add("fade-in");
    }, 600);
}

yesBtn.addEventListener("click", () => {
    celebrationModal.classList.remove("hidden");
    celebrationModal.classList.add("fade-in");
});
