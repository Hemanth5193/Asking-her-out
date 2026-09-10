const beginButton = document.getElementById("beginButton");
const introContainer = document.getElementById("introContainer");
const storySection = document.getElementById("storySection");

const scene2Intro = document.getElementById("scene2Intro");
const sakuraBtn = document.getElementById("sakuraBtn");
const poemContainer = document.getElementById("poemContainer");
const nextToScene3Btn = document.getElementById("nextToScene3Btn");

const petalTransition = document.getElementById("petalTransition");
const gameSection = document.getElementById("gameSection");
const rainbowContainer = document.getElementById("rainbowContainer");
const counterBadge = document.getElementById("counter");

const complimentModal = document.getElementById("complimentModal");
const complimentText = document.getElementById("complimentText");
const continueGameBtn = document.getElementById("continueGameBtn");
const finalUnlockCard = document.getElementById("finalUnlockCard");

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

// Scene 2 -> Scene 3 (Cherry Petal Transition)
nextToScene3Btn.addEventListener("click", function () {
    triggerPetalTransition(() => {
        storySection.classList.remove("show");
        storySection.style.display = "none";
        gameSection.classList.add("show");
        initRainbowGame();
    });
});

// Cherry Blossom Storm Effect
function triggerPetalTransition(callback) {
    petalTransition.innerHTML = "";
    for (let i = 0; i < 40; i++) {
        const petal = document.createElement("div");
        petal.classList.add("transition-petal");
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${0.8 + Math.random() * 0.8}s`;
        petal.style.animationDelay = `${Math.random() * 0.3}s`;
        petalTransition.appendChild(petal);
    }

    setTimeout(callback, 900);

    setTimeout(() => {
        petalTransition.innerHTML = "";
    }, 1800);
}

/* ========================================
   SCENE 3: RAINBOW SAKURA GAME
   ======================================== */

const compliments = [
    "Your smile—it literally brightens up my worst days. 😊",
    "How effortless it is to talk to you for hours about absolutely everything. ✨",
    "The gentle, thoughtful way you care about the people around you. 💖",
    "Every single memory with you instantly becomes my absolute favorite. 🌸",
    "How beautiful your mind is and the unique way you view the world. 🌙",
    "Just being near you makes everything feel a little more magical. ❤️"
];

const colors = ["pink", "lavender", "mint", "gold", "blue", "rose"];
let caughtCount = 0;
let rainbowIntervals = [];

function initRainbowGame() {
    rainbowContainer.innerHTML = "";
    caughtCount = 0;
    counterBadge.textContent = `Blossoms Caught: 0 / 6`;

    for (let i = 0; i < 6; i++) {
        const btn = document.createElement("button");
        btn.classList.add("rainbow-sakura", `color-${colors[i]}`);
        btn.innerHTML = "🌸";
        btn.setAttribute("data-index", i);
        
        // Fast random positioning & floating movement
        positionRandomly(btn);
        rainbowContainer.appendChild(btn);

        const interval = setInterval(() => {
            moveFast(btn);
        }, 900); // Fast 0.9s intervals

        rainbowIntervals.push(interval);

        btn.addEventListener("click", () => handlePetalCatch(btn, i));
    }
}

function positionRandomly(element) {
    const maxX = window.innerWidth - 80;
    const maxY = window.innerHeight - 200;
    const x = Math.max(20, Math.random() * maxX);
    const y = Math.max(120, Math.random() * maxY);
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
}

function moveFast(element) {
    if (element.classList.contains("caught")) return;
    const maxX = window.innerWidth - 80;
    const maxY = window.innerHeight - 200;
    const x = Math.max(20, Math.random() * maxX);
    const y = Math.max(120, Math.random() * maxY);
    element.style.transform = `translate(${x - parseFloat(element.style.left || 0)}px, ${y - parseFloat(element.style.top || 0)}px)`;
}

function handlePetalCatch(btn, index) {
    if (btn.classList.contains("caught")) return;
    btn.classList.add("caught");
    btn.style.opacity = "0";
    btn.style.pointerEvents = "none";

    caughtCount++;
    counterBadge.textContent = `Blossoms Caught: ${caughtCount} / 6`;

    // Show Compliment Modal
    complimentText.textContent = compliments[index];
    complimentModal.classList.remove("hidden");
    complimentModal.classList.add("fade-in");
}

continueGameBtn.addEventListener("click", () => {
    complimentModal.classList.add("hidden");
    complimentModal.classList.remove("fade-in");

    if (caughtCount === 6) {
        // Clear remaining game elements & reveal final unlock
        rainbowIntervals.forEach(clearInterval);
        rainbowContainer.style.display = "none";
        document.querySelector(".game-header").style.display = "none";

        finalUnlockCard.classList.remove("hidden");
        finalUnlockCard.classList.add("fade-in");
    }
});

// Scene 3 -> Proposal Scene (Ready for Scene 4!)
document.getElementById("toProposalBtn").addEventListener("click", () => {
    gameSection.classList.remove("show");
    gameSection.classList.add("fade-out");
    setTimeout(() => {
        gameSection.style.display = "none";
        // Final proposal scene trigger goes here!
    }, 800);
});
