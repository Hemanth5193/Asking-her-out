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
// 3-PHASE CINEMATIC BANKAI TRANSITION
// ========================================

function triggerBankaiTransition(onComplete) {
    const canvas = document.getElementById('bankaiCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.opacity = '1';

    let animationFrame;
    let startTime = performance.now();
    const duration = 4000; // 4 second cinematic duration

    let shakeTriggered = false;

    // Create 600 multi-layered particles
    const particles = [];
    const particleCount = window.innerWidth < 480 ? 350 : 650;

    for (let i = 0; i < particleCount; i++) {
        const layer = Math.random(); 
        particles.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 60,
            y: canvas.height / 2 + (Math.random() - 0.5) * 60,
            angle: Math.random() * Math.PI * 2,
            vortexRadius: Math.random() * (canvas.width * 0.4),
            speed: Math.random() * 6 + 3,
            size: layer > 0.85 ? Math.random() * 8 + 6 : (layer > 0.3 ? Math.random() * 5 + 3 : Math.random() * 3 + 1), // Depth scaling
            spin: (Math.random() - 0.5) * 0.15,
            alpha: 1,
            layer: layer, // Depth layer: foreground, midground, background
            colorType: Math.random()
        });
    }

    // Shockwave ripple state
    let shockwaveRadius = 0;

    function render(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // ----------------------------------------------------
        // PHASE 1: Giant Blade Drop & Impact (0.0s - 0.9s)
        // ----------------------------------------------------
        if (progress < 0.25) {
            const dropProgress = progress / 0.25;
            const bladeHeight = canvas.height * dropProgress;
            const bladeWidth = Math.min(45, canvas.width * 0.04);

            ctx.save();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            ctx.shadowBlur = 35;
            ctx.shadowColor = '#ff69b4';

            // Twin Giant Blades descending from top center-left and center-right
            const leftBladeX = canvas.width * 0.35 - bladeWidth / 2;
            const rightBladeX = canvas.width * 0.65 - bladeWidth / 2;

            ctx.fillRect(leftBladeX, 0, bladeWidth, bladeHeight);
            ctx.fillRect(rightBladeX, 0, bladeWidth, bladeHeight);

            // Blade Tips (Pointy bottom)
            ctx.beginPath();
            ctx.moveTo(leftBladeX, bladeHeight);
            ctx.lineTo(leftBladeX + bladeWidth / 2, bladeHeight + 35);
            ctx.lineTo(leftBladeX + bladeWidth, bladeHeight);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(rightBladeX, bladeHeight);
            ctx.lineTo(rightBladeX + bladeWidth / 2, bladeHeight + 35);
            ctx.lineTo(rightBladeX + bladeWidth, bladeHeight);
            ctx.fill();

            ctx.restore();
        }

        // ----------------------------------------------------
        // IMPACT EVENT at ~0.9s: Trigger Screen Shake & Shockwave
        // ----------------------------------------------------
        if (progress >= 0.22 && !shakeTriggered) {
            shakeTriggered = true;
            document.body.classList.add("bankai-shake");
            setTimeout(() => document.body.classList.remove("bankai-shake"), 400);
        }

        // Expand Radial Shockwave
        if (progress >= 0.22 && progress < 0.55) {
            const shockProgress = (progress - 0.22) / 0.33;
            shockwaveRadius = shockProgress * (canvas.width * 0.85);

            ctx.save();
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height, shockwaveRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 215, 0, ${1 - shockProgress})`;
            ctx.lineWidth = 12 * (1 - shockProgress);
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#ffd700';
            ctx.stroke();
            ctx.restore();
        }

        // ----------------------------------------------------
        // PHASE 2: Vortex Petal Swarm (0.25s - 0.85s)
        // ----------------------------------------------------
        if (progress >= 0.22) {
            const swarmProgress = (progress - 0.22) / 0.78;

            particles.forEach(p => {
                p.angle += p.spin + 0.03;
                
                // Spiral helical upward swirl math
                const currentRadius = p.vortexRadius * swarmProgress;
                const targetX = (canvas.width / 2) + Math.cos(p.angle) * currentRadius;
                const targetY = (canvas.height * 1.1) - (swarmProgress * (canvas.height * 1.3)) + Math.sin(p.angle) * 80;

                p.x += (targetX - p.x) * 0.12;
                p.y += (targetY - p.y) * 0.12;

                // Color Shifting: Pink -> Rose -> Radiant Gold
                let fillColor = '#ffb7c5';
                if (p.colorType > 0.6) fillColor = '#ffd700';
                else if (p.colorType > 0.35) fillColor = '#ff69b4';

                // Fade Out near end
                if (swarmProgress > 0.75) {
                    p.alpha = 1 - (swarmProgress - 0.75) / 0.25;
                }

                ctx.save();
                ctx.globalAlpha = Math.max(p.alpha, 0);
                ctx.fillStyle = fillColor;
                
                // Blur background layers, crisp glow foreground layers
                if (p.layer > 0.8) {
                    ctx.shadowBlur = 18;
                    ctx.shadowColor = '#ffffff';
                } else {
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = '#ff1493';
                }

                // Render as glowing petal shapes (ellipses)
                ctx.beginPath();
                ctx.ellipse(p.x, p.y, p.size * 1.8, p.size, p.angle, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
        }

        // ----------------------------------------------------
        // PHASE 3: White Screen Burst & Transition (0.75s - 1.0s)
        // ----------------------------------------------------
        if (progress > 0.75) {
            const flashProgress = (progress - 0.75) / 0.25;
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.sin(flashProgress * Math.PI) * 0.85})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Loop until duration completes
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
