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

// ========================================
// SCENE 1 & 2 TRANSITIONS & TIMINGS
// ========================================

beginButton.addEventListener("click", function () {
    introContainer.classList.add("fade-out");

    setTimeout(() => {
        introContainer.style.display = "none";
        storySection.classList.add("show");
        startSakuraFloating();
    }, 800);
});

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

// ========================================
// SCENE 3: VIBGYOR RAINBOW SAKURA GAME
// ========================================

startGameBtn.addEventListener("click", () => {
    preGamePrompt.classList.add("hidden");
    gamePlayArea.classList.remove("hidden");
    gamePlayArea.classList.add("fade-in");
    initRainbowGame();
});

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
        
        setRandomInitialPosition(btn);
        rainbowContainer.appendChild(btn);

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

congratsBtn.addEventListener("click", () => {
    gameSection.classList.remove("show");
    gameSection.classList.add("fade-out");
    setTimeout(() => {
        gameSection.style.display = "none";
        initScene4Puzzle();
    }, 800);
});

// ========================================
// SCENE 4: SAKURA PUZZLE ENGINE
// ========================================

const scene4Qualities = ["Kind", "Beautiful", "Strong", "Funny", "Elegant"];
let freeMovingPetals = [];
let scene4CaughtCount = 0;

function createSakuraPetalSVG() {
    return `
    <svg class="sakura-svg-petal" viewBox="0 0 100 130">
        <defs>
            <linearGradient id="sakuraPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stop-color="rgba(255, 182, 193, 0.95)" />
                <stop offset="50%" stop-color="rgba(255, 192, 203, 0.85)" />
                <stop offset="100%" stop-color="rgba(255, 240, 245, 0.95)" />
            </linearGradient>
            <linearGradient id="sakuraGoldenPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stop-color="rgba(218, 165, 32, 0.95)" />
                <stop offset="45%" stop-color="rgba(255, 215, 0, 0.9)" />
                <stop offset="100%" stop-color="rgba(255, 250, 205, 0.98)" />
            </linearGradient>
        </defs>
        <path class="petal-path" d="M 50 125 C 20 100, 2 65, 8 35 C 12 18, 28 8, 42 16 C 47 19, 49 22, 50 24 C 51 22, 53 19, 58 16 C 72 8, 88 18, 92 35 C 98 65, 80 100, 50 125 Z" />
    </svg>`;
}

function initScene4Puzzle() {
    const scene4Section = document.getElementById("scene4Section");
    const floatingPetalsLayer = document.getElementById("floatingPetalsLayer");
    const attachedPetalsContainer = document.getElementById("attachedPetals");
    const sakuraBloomAura = document.getElementById("sakuraBloomAura");
    
    scene4Section.classList.add("show");
    floatingPetalsLayer.innerHTML = "";
    attachedPetalsContainer.innerHTML = "";
    sakuraBloomAura.classList.remove("active");
    
    freeMovingPetals = [];
    scene4CaughtCount = 0;

    scene4Qualities.forEach((quality, index) => {
        const petalWrap = document.createElement("div");
        petalWrap.classList.add("floating-petal-wrapper");
        petalWrap.innerHTML = createSakuraPetalSVG();

        const marginX = 80;
        const marginY = 100;
        const initialX = marginX + Math.random() * (window.innerWidth - marginX * 2);
        const initialY = marginY + Math.random() * (window.innerHeight - marginY * 2);

        petalWrap.style.left = `${initialX}px`;
        petalWrap.style.top = `${initialY}px`;

        floatingPetalsLayer.appendChild(petalWrap);

        const petalObj = {
            element: petalWrap,
            quality: quality,
            index: index,
            x: initialX,
            y: initialY,
            vx: (Math.random() - 0.5) * 2.5,
            vy: (Math.random() - 0.5) * 2.5,
            rotation: Math.random() * 360,
            vRot: (Math.random() - 0.5) * 2,
            interval: null
        };

        petalObj.interval = setInterval(() => animateFreePetal(petalObj), 40);
        freeMovingPetals.push(petalObj);

        petalWrap.addEventListener("click", () => handleCatchScene4Petal(petalObj));
    });
}

function animateFreePetal(p) {
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.vRot;

    if (p.x < 40 || p.x > window.innerWidth - 100) p.vx *= -1;
    if (p.y < 60 || p.y > window.innerHeight - 120) p.vy *= -1;

    if (Math.random() < 0.05) {
        p.vx += (Math.random() - 0.5) * 1.2;
        p.vy += (Math.random() - 0.5) * 1.2;
        
        p.vx = Math.max(-2.5, Math.min(2.5, p.vx));
        p.vy = Math.max(-2.5, Math.min(2.5, p.vy));
    }

    p.element.style.left = `${p.x}px`;
    p.element.style.top = `${p.y}px`;
    p.element.style.transform = `rotate(${p.rotation}deg) scale(${0.9 + Math.sin(Date.now() / 400) * 0.08})`;
}

function handleCatchScene4Petal(p) {
    clearInterval(p.interval);
    p.element.style.pointerEvents = "none";
    
    const centerCore = document.getElementById("sakuraCenterCore");
    const rect = centerCore.getBoundingClientRect();

    p.element.style.left = `${rect.left + rect.width / 2 - 40}px`;
    p.element.style.top = `${rect.top + rect.height / 2 - 50}px`;
    p.element.style.transform = `scale(0.15) rotate(0deg)`;
    p.element.style.opacity = "0";

    setTimeout(() => {
        p.element.remove();
        attachPetalToFlower(p.quality, p.index);
    }, 600);

    scene4CaughtCount++;
    if (scene4CaughtCount === 5) {
        triggerPuzzleCompletion();
    }
}

function attachPetalToFlower(quality, index) {
    const attachedContainer = document.getElementById("attachedPetals");
    const petalWrap = document.createElement("div");
    petalWrap.classList.add("attached-petal-wrapper");
    petalWrap.innerHTML = createSakuraPetalSVG();

    const angleDeg = index * 72;
    petalWrap.style.transform = `translate(-50%, -100%) rotate(${angleDeg}deg)`;

    const label = document.createElement("span");
    label.classList.add("petal-label");
    label.textContent = quality;
    label.style.transform = `rotate(-${angleDeg}deg)`;

    petalWrap.appendChild(label);
    attachedContainer.appendChild(petalWrap);
}

function triggerPuzzleCompletion() {
    const container = document.getElementById("sakuraPuzzleContainer");
    const aura = document.getElementById("sakuraBloomAura");
    const completionCard = document.getElementById("scene4Completion");

    setTimeout(() => {
        container.classList.add("golden-completed");
        aura.classList.add("active");

        completionCard.classList.remove("hidden");
        completionCard.classList.add("fade-in");

        // Bind click explicitly once button turns visible
        const readyBtn = document.getElementById("readyForItBtn");
        if (readyBtn) {
            readyBtn.onclick = handleTransitionToProposal;
        }
    }, 800);
}

// Direct Handler to switch from Scene 4 into Senbonzakura Bankai -> Scene 5 Proposal
function handleTransitionToProposal() {
    const scene4Section = document.getElementById("scene4Section");
    const proposalSection = document.getElementById("proposalSection");

    scene4Section.classList.remove("show");
    scene4Section.classList.add("fade-out");

    setTimeout(() => {
        scene4Section.style.display = "none";

        triggerBankaiTransition(() => {
            proposalSection.classList.remove("hidden");
            proposalSection.style.display = "flex";
            proposalSection.classList.add("show");
        });
    }, 800);
}

// ========================================
// SENBONZAKURA BANKAI TRANSITION ENGINE
// ========================================

function triggerBankaiTransition(onComplete) {
    const canvas = document.getElementById('bankaiCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.opacity = '1';

    let animationFrame;
    let startTime = performance.now();
    const duration = 3800;

    const particles = [];
    const particleCount = 220;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 8 + 4,
            radius: Math.random() * 6 + 3,
            spin: (Math.random() - 0.5) * 0.2,
            alpha: 1,
            color: Math.random() > 0.3 ? '#ffb7c5' : '#ffd700'
        });
    }

    function render(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (progress < 0.3) {
            const bladeWidth = (progress / 0.3) * 60;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
            ctx.shadowBlur = 30;
            ctx.shadowColor = '#ff69b4';

            ctx.fillRect(canvas.width * 0.15 - bladeWidth / 2, 0, bladeWidth, canvas.height);
            ctx.fillRect(canvas.width * 0.85 - bladeWidth / 2, 0, bladeWidth, canvas.height);
        }

        particles.forEach(p => {
            p.angle += p.spin;
            p.x += Math.cos(p.angle) * p.speed * (1 + progress * 2);
            p.y += Math.sin(p.angle) * p.speed * (1 + progress * 2);

            if (progress > 0.7) {
                p.alpha = 1 - (progress - 0.7) / 0.3;
            }

            ctx.save();
            ctx.globalAlpha = Math.max(p.alpha, 0);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#ff1493';

            ctx.beginPath();
            ctx.ellipse(p.x, p.y, p.radius * 2, p.radius, p.angle, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        if (progress < 1) {
            animationFrame = requestAnimationFrame(render);
        } else {
            canvas.style.opacity = '0';
            cancelAnimationFrame(animationFrame);
            if (onComplete) onComplete();
        }
    }

    requestAnimationFrame(render);
}
