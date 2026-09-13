/* =========================================================
   ROMANTIC SAKURA PROPOSAL WEBSITE
   Complete JavaScript
   ========================================================= */

"use strict";

/* =========================================================
   ELEMENT REFERENCES
   ========================================================= */

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

const scene4Section = document.getElementById("scene4Section");
const floatingPetalsLayer = document.getElementById("floatingPetalsLayer");
const attachedPetals = document.getElementById("attachedPetals");
const sakuraBloomAura = document.getElementById("sakuraBloomAura");
const sakuraPuzzleContainer = document.getElementById("sakuraPuzzleContainer");
const scene4Completion = document.getElementById("scene4Completion");
const readyForItBtn = document.getElementById("readyForItBtn");

const proposalSection = document.getElementById("proposalSection");
const yesBtn = document.getElementById("yesBtn");
const alwaysBtn = document.getElementById("alwaysBtn");

const bankaiCanvas = document.getElementById("bankaiCanvas");

/* =========================================================
   GLOBAL STATE
   ========================================================= */

let moveInterval = null;
let activePetals = [];

let caughtCount = 0;

let freeMovingPetals = [];
let scene4CaughtCount = 0;

let proposalAnswered = false;


/* =========================================================
   SAFETY CHECK
   ========================================================= */

if (!bankaiCanvas) {
    console.error("bankaiCanvas was not found.");
}


/* =========================================================
   SCENE 1
   INTRO -> SCENE 2
   ========================================================= */

if (beginButton) {
    beginButton.addEventListener("click", () => {

        introContainer.classList.add("fade-out");

        setTimeout(() => {

            introContainer.style.display = "none";

            storySection.style.display = "flex";
            storySection.classList.add("show");

            startSakuraFloating();

        }, 800);

    });
}


/* =========================================================
   SCENE 2
   FLOATING SAKURA
   ========================================================= */

function startSakuraFloating() {

    moveSakura();

    if (moveInterval) {
        clearInterval(moveInterval);
    }

    moveInterval = setInterval(moveSakura, 2000);
}


function moveSakura() {

    if (!sakuraBtn) return;

    const maxX = Math.min(window.innerWidth - 100, 280);
    const maxY = Math.min(window.innerHeight - 100, 180);

    const randomX = (Math.random() - 0.5) * maxX;
    const randomY = (Math.random() - 0.5) * maxY;

    sakuraBtn.style.transform =
        `translate(${randomX}px, ${randomY}px) scale(1.1)`;
}


/* =========================================================
   CATCH FIRST SAKURA
   ========================================================= */

if (sakuraBtn) {

    sakuraBtn.addEventListener("click", () => {

        if (moveInterval) {
            clearInterval(moveInterval);
        }

        scene2Intro.style.display = "none";

        poemContainer.classList.remove("hidden");
        poemContainer.classList.add("fade-in");

    });

}


/* =========================================================
   SCENE 2 -> SCENE 3
   ========================================================= */

if (nextToScene3Btn) {

    nextToScene3Btn.addEventListener("click", () => {

        triggerPetalTransition(() => {

            storySection.classList.remove("show");
            storySection.style.display = "none";

            gameSection.style.display = "flex";
            gameSection.classList.add("show");

        });

    });

}


/* =========================================================
   NORMAL PETAL TRANSITION
   ========================================================= */

function triggerPetalTransition(callback) {

    if (!petalTransition) {
        callback();
        return;
    }

    petalTransition.innerHTML = "";

    const petalCount =
        window.innerWidth > 768 ? 90 : 45;

    for (let i = 0; i < petalCount; i++) {

        const petal = document.createElement("div");

        petal.classList.add("transition-petal");

        petal.style.left =
            `${Math.random() * 100}vw`;

        petal.style.animationDuration =
            `${1.2 + Math.random() * 1.2}s`;

        petal.style.animationDelay =
            `${Math.random() * 0.5}s`;

        petalTransition.appendChild(petal);
    }

    setTimeout(() => {

        callback();

    }, 1100);

    setTimeout(() => {

        petalTransition.innerHTML = "";

    }, 2500);
}


/* =========================================================
   SCENE 3
   VIBGYOR RAINBOW GAME
   ========================================================= */

const compliments = [
    "Violet 💜 — Your grace and calm presence soothe my mind in every way.",
    "Indigo 💙 — The profound, gentle depth in the way you care about people.",
    "Blue 🩵 — How time completely dissolves when we talk for hours.",
    "Green 💚 — Your radiant smile instantly fills my life with comfort.",
    "Yellow 💛 — Your warm brightness turns my hardest days into light.",
    "Orange 🧡 — Every ordinary memory with you turns into pure gold.",
    "Red ❤️ — You are my favorite place to be, today and always."
];

const vibgyorColors = [
    "violet",
    "indigo",
    "blue",
    "green",
    "yellow",
    "orange",
    "red"
];


if (startGameBtn) {

    startGameBtn.addEventListener("click", () => {

        preGamePrompt.classList.add("hidden");

        gamePlayArea.classList.remove("hidden");
        gamePlayArea.classList.add("fade-in");

        initRainbowGame();

    });

}


/* =========================================================
   INITIALIZE RAINBOW GAME
   ========================================================= */

function initRainbowGame() {

    rainbowContainer.innerHTML = "";

    activePetals.forEach(p => {
        if (p.interval) {
            clearInterval(p.interval);
        }
    });

    activePetals = [];

    caughtCount = 0;

    counterBadge.textContent =
        "Blossoms Caught: 0 / 7";


    for (let i = 0; i < 7; i++) {

        const btn = document.createElement("button");

        btn.classList.add(
            "rainbow-sakura",
            `vibgyor-${vibgyorColors[i]}`
        );

        btn.innerHTML = "🌸";

        btn.setAttribute("data-index", i);

        setRandomInitialPosition(btn);

        rainbowContainer.appendChild(btn);


        const petalObj = {

            element: btn,

            interval: setInterval(() => {

                glidePetal(btn);

            }, 900 + Math.random() * 400)

        };


        activePetals.push(petalObj);


        btn.addEventListener("click", () => {

            handlePetalCatch(btn, i);

        });

    }

}


/* =========================================================
   INITIAL PETAL POSITION
   ========================================================= */

function setRandomInitialPosition(element) {

    const marginX = 80;
    const marginY = 120;

    const availableWidth =
        Math.max(200, window.innerWidth - marginX * 2);

    const availableHeight =
        Math.max(200, window.innerHeight - marginY * 2);

    const startX =
        marginX + Math.random() * availableWidth;

    const startY =
        marginY + Math.random() * availableHeight;

    element.style.left = `${startX}px`;
    element.style.top = `${startY}px`;

    element.style.transform =
        "translate(0px, 0px) scale(1)";
}


/* =========================================================
   MOVE RAINBOW PETAL
   ========================================================= */

function glidePetal(element) {

    if (!element) return;

    if (element.classList.contains("caught")) {
        return;
    }

    const currentLeft =
        parseFloat(element.style.left) || 100;

    const currentTop =
        parseFloat(element.style.top) || 150;


    const moveRangeX =
        window.innerWidth > 768 ? 240 : 130;

    const moveRangeY =
        window.innerHeight > 768 ? 200 : 110;


    let deltaX =
        (Math.random() - 0.5) * moveRangeX;

    let deltaY =
        (Math.random() - 0.5) * moveRangeY;


    if (
        currentLeft + deltaX < 60 ||
        currentLeft + deltaX > window.innerWidth - 80
    ) {
        deltaX *= -1;
    }


    if (
        currentTop + deltaY < 100 ||
        currentTop + deltaY > window.innerHeight - 100
    ) {
        deltaY *= -1;
    }


    const scale =
        0.95 + Math.random() * 0.15;


    element.style.transform =
        `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
}


/* =========================================================
   CATCH RAINBOW PETAL
   ========================================================= */

function handlePetalCatch(btn, index) {

    if (!btn) return;

    if (btn.classList.contains("caught")) {
        return;
    }

    btn.classList.add("caught");

    btn.style.transform += " scale(1.6)";

    btn.style.opacity = "0";

    btn.style.pointerEvents = "none";

    caughtCount++;


    counterBadge.textContent =
        `Blossoms Caught: ${caughtCount} / 7`;


    complimentText.textContent =
        compliments[index];


    complimentModal.classList.remove("hidden");
    complimentModal.classList.add("fade-in");
}


/* =========================================================
   CONTINUE GAME
   ========================================================= */

if (continueGameBtn) {

    continueGameBtn.addEventListener("click", () => {

        complimentModal.classList.add("hidden");

        complimentModal.classList.remove("fade-in");


        if (caughtCount === 7) {

            activePetals.forEach(p => {

                if (p.interval) {
                    clearInterval(p.interval);
                }

            });


            rainbowContainer.style.display = "none";

            gamePlayArea.style.display = "none";


            finalUnlockCard.classList.remove("hidden");

            finalUnlockCard.classList.add("fade-in");

        }

    });

}


/* =========================================================
   SCENE 3 -> SCENE 4
   ========================================================= */

if (congratsBtn) {

    congratsBtn.addEventListener("click", () => {

        gameSection.classList.remove("show");

        gameSection.classList.add("fade-out");


        setTimeout(() => {

            gameSection.style.display = "none";

            gameSection.classList.remove("fade-out");

            initScene4Puzzle();

        }, 800);

    });

}


/* =========================================================
   SCENE 4
   SAKURA PUZZLE
   ========================================================= */

const scene4Qualities = [
    "Kind",
    "Beautiful",
    "Strong",
    "Funny",
    "Elegant"
];


/* =========================================================
   CREATE SAKURA PETAL SVG
   ========================================================= */

function createSakuraPetalSVG() {

    return `
        <svg
            class="sakura-svg-petal"
            viewBox="0 0 100 130"
            aria-hidden="true"
        >

            <defs>

                <linearGradient
                    id="sakuraPetalGrad"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >

                    <stop
                        offset="0%"
                        stop-color="rgba(255,182,193,0.95)"
                    />

                    <stop
                        offset="50%"
                        stop-color="rgba(255,192,203,0.85)"
                    />

                    <stop
                        offset="100%"
                        stop-color="rgba(255,240,245,0.95)"
                    />

                </linearGradient>


                <linearGradient
                    id="sakuraGoldenPetalGrad"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >

                    <stop
                        offset="0%"
                        stop-color="rgba(218,165,32,0.95)"
                    />

                    <stop
                        offset="45%"
                        stop-color="rgba(255,215,0,0.9)"
                    />

                    <stop
                        offset="100%"
                        stop-color="rgba(255,250,205,0.98)"
                    />

                </linearGradient>

            </defs>


            <path
                class="petal-path"
                d="
                    M 50 125
                    C 20 100, 2 65, 8 35
                    C 12 18, 28 8, 42 16
                    C 47 19, 49 22, 50 24
                    C 51 22, 53 19, 58 16
                    C 72 8, 88 18, 92 35
                    C 98 65, 80 100, 50 125
                    Z
                "
            />

        </svg>
    `;
}


/* =========================================================
   INITIALIZE SCENE 4
   ========================================================= */

function initScene4Puzzle() {

    scene4Section.style.display = "flex";

    scene4Section.classList.remove("fade-out");

    scene4Section.classList.add("show");


    floatingPetalsLayer.innerHTML = "";

    attachedPetals.innerHTML = "";


    sakuraBloomAura.classList.remove("active");

    sakuraPuzzleContainer.classList.remove(
        "golden-completed"
    );


    scene4Completion.classList.add("hidden");


    freeMovingPetals.forEach(p => {

        if (p.interval) {
            clearInterval(p.interval);
        }

    });


    freeMovingPetals = [];

    scene4CaughtCount = 0;


    scene4Qualities.forEach((quality, index) => {

        createFloatingScene4Petal(
            quality,
            index
        );

    });

}


/* =========================================================
   CREATE FLOATING SCENE 4 PETAL
   ========================================================= */

function createFloatingScene4Petal(
    quality,
    index
) {

    const petalWrap =
        document.createElement("div");


    petalWrap.classList.add(
        "floating-petal-wrapper"
    );


    petalWrap.innerHTML =
        createSakuraPetalSVG();


    const marginX = 80;
    const marginY = 100;


    const initialX =
        marginX +
        Math.random() *
        Math.max(
            200,
            window.innerWidth - marginX * 2
        );


    const initialY =
        marginY +
        Math.random() *
        Math.max(
            200,
            window.innerHeight - marginY * 2
        );


    petalWrap.style.left =
        `${initialX}px`;

    petalWrap.style.top =
        `${initialY}px`;


    floatingPetalsLayer.appendChild(
        petalWrap
    );


    const petalObj = {

        element: petalWrap,

        quality: quality,

        index: index,

        x: initialX,

        y: initialY,

        vx:
            (Math.random() - 0.5) * 2.5,

        vy:
            (Math.random() - 0.5) * 2.5,

        rotation:
            Math.random() * 360,

        vRot:
            (Math.random() - 0.5) * 2,

        interval: null,

        caught: false

    };


    petalObj.interval =
        setInterval(() => {

            animateFreePetal(
                petalObj
            );

        }, 40);


    freeMovingPetals.push(
        petalObj
    );


    petalWrap.addEventListener(
        "click",
        () => {

            handleCatchScene4Petal(
                petalObj
            );

        }
    );

}


/* =========================================================
   ANIMATE SCENE 4 PETAL
   ========================================================= */

function animateFreePetal(p) {

    if (!p || p.caught) {
        return;
    }


    p.x += p.vx;

    p.y += p.vy;

    p.rotation += p.vRot;


    if (
        p.x < 40 ||
        p.x > window.innerWidth - 100
    ) {

        p.vx *= -1;

    }


    if (
        p.y < 60 ||
        p.y > window.innerHeight - 120
    ) {

        p.vy *= -1;

    }


    if (Math.random() < 0.05) {

        p.vx +=
            (Math.random() - 0.5) * 1.2;

        p.vy +=
            (Math.random() - 0.5) * 1.2;


        p.vx =
            Math.max(
                -2.5,
                Math.min(2.5, p.vx)
            );


        p.vy =
            Math.max(
                -2.5,
                Math.min(2.5, p.vy)
            );

    }


    p.element.style.left =
        `${p.x}px`;

    p.element.style.top =
        `${p.y}px`;


    const scale =
        0.9 +
        Math.sin(Date.now() / 400) * 0.08;


    p.element.style.transform =
        `rotate(${p.rotation}deg) scale(${scale})`;

}


/* =========================================================
   CATCH SCENE 4 PETAL
   ========================================================= */

function handleCatchScene4Petal(p) {

    if (!p || p.caught) {
        return;
    }


    p.caught = true;


    clearInterval(p.interval);


    p.element.style.pointerEvents =
        "none";


    const centerRect =
        document
            .getElementById("sakuraCenterCore")
            .getBoundingClientRect();


    p.element.style.left =
        `${centerRect.left +
            centerRect.width / 2 -
            40}px`;


    p.element.style.top =
        `${centerRect.top +
            centerRect.height / 2 -
            50}px`;


    p.element.style.transform =
        "scale(0.15) rotate(0deg)";


    p.element.style.opacity =
        "0";


    setTimeout(() => {

        if (p.element) {
            p.element.remove();
        }


        attachPetalToFlower(
            p.quality,
            p.index
        );

    }, 600);


    scene4CaughtCount++;


    if (scene4CaughtCount === 5) {

        triggerPuzzleCompletion();

    }

}


/* =========================================================
   ATTACH PETAL TO FLOWER
   ========================================================= */

function attachPetalToFlower(
    quality,
    index
) {

    const petalWrap =
        document.createElement("div");


    petalWrap.classList.add(
        "attached-petal-wrapper"
    );


    petalWrap.innerHTML =
        createSakuraPetalSVG();


    const angleDeg =
        index * 72;


    petalWrap.style.transform =
        `translate(-50%, -100%) rotate(${angleDeg}deg)`;


    const label =
        document.createElement("span");


    label.classList.add(
        "petal-label"
    );


    label.textContent =
        quality;


    label.style.transform =
        `rotate(-${angleDeg}deg)`;


    petalWrap.appendChild(label);


    attachedPetals.appendChild(
        petalWrap
    );

}


/* =========================================================
   SCENE 4 COMPLETION
   ========================================================= */

function triggerPuzzleCompletion() {

    setTimeout(() => {

        sakuraPuzzleContainer.classList.add(
            "golden-completed"
        );


        sakuraBloomAura.classList.add(
            "active"
        );


        scene4Completion.classList.remove(
            "hidden"
        );


        scene4Completion.classList.add(
            "fade-in"
        );


        freeMovingPetals.forEach(p => {

            if (p.interval) {
                clearInterval(p.interval);
            }

        });

    }, 800);

}


/* =========================================================
   SCENE 4 -> PROPOSAL
   ========================================================= */

if (readyForItBtn) {

    readyForItBtn.addEventListener(
        "click",
        handleTransitionToProposal
    );

}


function handleTransitionToProposal() {

    scene4Section.classList.remove(
        "show"
    );


    scene4Section.classList.add(
        "fade-out"
    );


    setTimeout(() => {

        scene4Section.style.display =
            "none";


        scene4Section.classList.remove(
            "fade-out"
        );


        proposalSection.style.display =
            "flex";


        proposalSection.classList.remove(
            "hidden"
        );


        proposalSection.classList.add(
            "show"
        );

    }, 800);

}


/* =========================================================
   PROPOSAL BUTTONS
   YES / ALWAYS
   ========================================================= */

if (yesBtn) {

    yesBtn.addEventListener(
        "click",
        () => {

            startFinalBankaiTransition(
                "yes"
            );

        }
    );

}


if (alwaysBtn) {

    alwaysBtn.addEventListener(
        "click",
        () => {

            startFinalBankaiTransition(
                "always"
            );

        }
    );

}


/* =========================================================
   FINAL BANKAI TRANSITION
   =========================================================

   PHASE 1
   0.0 - 0.7 seconds
   Violent screen shake + dark crimson aura

   PHASE 2
   0.7 - 2.5 seconds
   Six giant tapestry / kimono banners
   + 300+ Sakura petals

   PHASE 3
   2.5 - 4.2 seconds
   Golden-white flash
   + Scene 6 reveal
   ========================================================= */

function startFinalBankaiTransition(answer) {

    if (proposalAnswered) {
        return;
    }

    proposalAnswered = true;


    proposalSection.style.pointerEvents =
        "none";


    createScene6();


    triggerBankaiTransition(() => {

        revealScene6(answer);

    });

}


/* =========================================================
   CREATE SCENE 6 DYNAMICALLY
   ========================================================= */

function createScene6() {

    if (document.getElementById("scene6")) {
        return;
    }


    const scene6 =
        document.createElement("section");


    scene6.id = "scene6";


    scene6.innerHTML = `

        <div class="scene6-aura"></div>

        <div class="scene6-petals"></div>

        <div class="scene6-card">

            <div class="scene6-symbol">
                🌸
            </div>

            <span class="scene6-label">
                OUR NEXT CHAPTER ❤️
            </span>

            <h1>
                Then it's you and me...
                <br>
                Forever. 💖
            </h1>

            <p>
                From this little moment
                to every tomorrow,
                I want to keep choosing you.
            </p>

            <div class="scene6-divider"></div>

            <div class="scene6-final-line">
                You are my favorite
                forever. 🌸
            </div>

        </div>
    `;


    document.body.appendChild(scene6);


    injectScene6Styles();

}


/* =========================================================
   SCENE 6 STYLES
   ========================================================= */

function injectScene6Styles() {

    if (document.getElementById(
        "scene6DynamicStyles"
    )) {
        return;
    }


    const style =
        document.createElement("style");


    style.id =
        "scene6DynamicStyles";


    style.textContent = `

        #scene6 {
            position: fixed;
            inset: 0;
            z-index: 100000;
            display: none;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            background:
                radial-gradient(
                    circle at center,
                    rgba(255,215,140,0.28) 0%,
                    rgba(82,14,47,0.55) 28%,
                    rgba(16,5,24,0.96) 75%
                );
            opacity: 0;
        }


        #scene6.visible {
            display: flex;
            animation:
                scene6Reveal 1.5s
                cubic-bezier(0.16,1,0.3,1)
                forwards;
        }


        .scene6-aura {
            position: absolute;
            width: 70vmin;
            height: 70vmin;
            border-radius: 50%;
            background:
                radial-gradient(
                    circle,
                    rgba(255,230,170,0.35),
                    rgba(255,105,180,0.12) 35%,
                    transparent 70%
                );
            filter: blur(8px);
            animation:
                scene6Aura 4s
                ease-in-out infinite;
        }


        .scene6-card {
            position: relative;
            z-index: 5;
            width: min(90%, 650px);
            padding: 45px 35px;
            text-align: center;

            background:
                linear-gradient(
                    135deg,
                    rgba(255,255,255,0.16),
                    rgba(255,190,220,0.09)
                );

            border:
                1px solid
                rgba(255,235,210,0.65);

            border-radius: 30px;

            backdrop-filter:
                blur(22px);

            -webkit-backdrop-filter:
                blur(22px);

            box-shadow:
                0 0 80px
                rgba(255,215,150,0.28),

                inset 0 1px 0
                rgba(255,255,255,0.5);

            transform:
                translateY(35px)
                scale(0.94);
        }


        #scene6.visible .scene6-card {
            animation:
                scene6CardReveal 1.3s
                0.25s
                cubic-bezier(0.16,1,0.3,1)
                forwards;
        }


        .scene6-symbol {
            font-size: 4rem;
            margin-bottom: 18px;

            filter:
                drop-shadow(
                    0 0 20px
                    rgba(255,215,0,0.9)
                );

            animation:
                scene6Flower 3s
                ease-in-out infinite;
        }


        .scene6-label {
            display: block;

            font-size: 0.75rem;
            letter-spacing: 4px;

            color:
                rgba(255,245,225,0.9);

            margin-bottom: 18px;
        }


        .scene6-card h1 {
            font-family:
                Georgia,
                serif;

            font-size:
                clamp(2rem, 6vw, 3.5rem);

            line-height: 1.25;

            font-weight: 400;

            margin-bottom: 22px;

            color: #fff;

            text-shadow:
                0 0 25px
                rgba(255,182,193,0.8);
        }


        .scene6-card p {
            font-size:
                clamp(1rem, 3vw, 1.25rem);

            line-height: 1.8;

            color:
                #fff0f5;

            margin-bottom: 25px;
        }


        .scene6-divider {
            width: 70px;
            height: 1px;

            margin:
                0 auto 25px;

            background:
                linear-gradient(
                    90deg,
                    transparent,
                    #ffd700,
                    transparent
                );

            box-shadow:
                0 0 12px
                rgba(255,215,0,0.9);
        }


        .scene6-final-line {
            font-family:
                Georgia,
                serif;

            font-size:
                clamp(1.1rem, 3vw, 1.5rem);

            font-style: italic;

            color:
                #ffe7c2;

            text-shadow:
                0 0 15px
                rgba(255,215,150,0.7);
        }


        .scene6-petals {
            position: absolute;
            inset: 0;
            pointer-events: none;
        }


        .scene6-petals::before,
        .scene6-petals::after {
            content: "🌸  ✦  🌸  ✧  🌸  ✦  🌸";

            position: absolute;
            left: -20%;
            width: 140%;

            font-size: 2rem;

            opacity: 0.6;

            animation:
                scene6PetalFlow
                9s
                linear
                infinite;
        }


        .scene6-petals::before {
            top: -10%;
        }


        .scene6-petals::after {
            top: -25%;
            animation-delay: -4s;
            opacity: 0.35;
        }


        @keyframes scene6Reveal {

            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }

        }


        @keyframes scene6CardReveal {

            from {
                opacity: 0;
                transform:
                    translateY(35px)
                    scale(0.94);
            }

            to {
                opacity: 1;
                transform:
                    translateY(0)
                    scale(1);
            }

        }


        @keyframes scene6Aura {

            0%,100% {
                transform: scale(0.95);
                opacity: 0.65;
            }

            50% {
                transform: scale(1.15);
                opacity: 1;
            }

        }


        @keyframes scene6Flower {

            0%,100% {
                transform:
                    rotate(-4deg)
                    scale(1);
            }

            50% {
                transform:
                    rotate(4deg)
                    scale(1.12);
            }

        }


        @keyframes scene6PetalFlow {

            from {
                transform:
                    translateY(-10vh)
                    rotate(0deg);
            }

            to {
                transform:
                    translateY(120vh)
                    rotate(360deg);
            }

        }


        @media (max-width: 480px) {

            .scene6-card {
                padding:
                    35px 22px;
                border-radius: 24px;
            }

            .scene6-symbol {
                font-size: 3.2rem;
            }

        }

    `;


    document.head.appendChild(style);

}


/* =========================================================
   FINAL BANKAI CANVAS
   ========================================================= */

function triggerBankaiTransition(
    onComplete
) {

    const canvas = bankaiCanvas;

    if (!canvas) {

        if (onComplete) {
            onComplete();
        }

        return;
    }


    const ctx =
        canvas.getContext("2d");


    if (!ctx) {

        if (onComplete) {
            onComplete();
        }

        return;
    }


    resizeBankaiCanvas();


    canvas.style.opacity = "1";


    const startTime =
        performance.now();


    const duration =
        4200;


    let animationFrame = null;

    let completed = false;


    /* -----------------------------------------------------
       PETAL PARTICLES
       ----------------------------------------------------- */

    const particles = [];


    const particleCount =
        window.innerWidth < 480
            ? 320
            : 520;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const depth =
            Math.random();


        particles.push({

            x:
                canvas.width / 2 +
                (Math.random() - 0.5) *
                120,

            y:
                canvas.height / 2 +
                (Math.random() - 0.5) *
                120,

            angle:
                Math.random() *
                Math.PI *
                2,

            radius:
                Math.random() *
                Math.max(
                    canvas.width,
                    canvas.height
                ) *
                0.55,

            speed:
                0.5 +
                Math.random() *
                1.8,

            size:
                depth > 0.8
                    ? 5 + Math.random() * 5
                    : 2 + Math.random() * 4,

            depth,

            rotation:
                Math.random() *
                Math.PI *
                2,

            alpha:
                0.35 +
                Math.random() * 0.65,

            drift:
                Math.random() *
                Math.PI *
                2

        });

    }


    /* -----------------------------------------------------
       BANNERS
       ----------------------------------------------------- */

    const banners = [];


    const bannerColors = [
        "#17102b",
        "#261034",
        "#35112f",
        "#1a0d2d",
        "#45132e",
        "#24102f"
    ];


    for (let i = 0; i < 6; i++) {

        banners.push({

            x:
                (i / 5) *
                canvas.width,

            width:
                canvas.width *
                0.19,

            height:
                canvas.height *
                1.25,

            delay:
                i * 0.12,

            color:
                bannerColors[i],

            rotation:
                (Math.random() - 0.5) *
                0.06

        });

    }


    /* -----------------------------------------------------
       GOLD LOOM LINES
       ----------------------------------------------------- */

    const loomLines = [];

    for (let i = 0; i < 32; i++) {

        loomLines.push({

            offset:
                Math.random(),

            alpha:
                0.15 +
                Math.random() * 0.35

        });

    }


    /* -----------------------------------------------------
       DRAW HELPERS
       ----------------------------------------------------- */

    function drawRadialAura(progress) {

        const gradient =
            ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                0,
                canvas.width / 2,
                canvas.height / 2,
                Math.max(
                    canvas.width,
                    canvas.height
                ) * 0.75
            );


        const strength =
            Math.sin(
                Math.min(progress / 0.7, 1) *
                Math.PI
            );


        gradient.addColorStop(
            0,
            `rgba(120, 8, 35, ${0.72 * strength})`
        );


        gradient.addColorStop(
            0.35,
            `rgba(60, 4, 30, ${0.45 * strength})`
        );


        gradient.addColorStop(
            1,
            "rgba(5, 2, 12, 0.92)"
        );


        ctx.fillStyle =
            gradient;


        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

    }


    function drawSacredGate(progress) {

        const gateProgress =
            Math.max(
                0,
                Math.min(
                    1,
                    (progress - 0.35) /
                    0.35
                )
            );


        if (gateProgress <= 0) {
            return;
        }


        const centerX =
            canvas.width / 2;


        const top =
            canvas.height *
            (0.35 - gateProgress * 0.35);


        const gateHeight =
            canvas.height *
            0.95 *
            gateProgress;


        ctx.save();


        ctx.globalAlpha =
            0.25 +
            gateProgress * 0.5;


        ctx.shadowBlur = 35;

        ctx.shadowColor =
            "rgba(255,215,100,0.95)";


        ctx.strokeStyle =
            "rgba(255,215,120,0.85)";


        ctx.lineWidth = 3;


        ctx.beginPath();


        ctx.moveTo(
            centerX - canvas.width * 0.28,
            top
        );


        ctx.lineTo(
            centerX - canvas.width * 0.28,
            top + gateHeight
        );


        ctx.moveTo(
            centerX + canvas.width * 0.28,
            top
        );


        ctx.lineTo(
            centerX + canvas.width * 0.28,
            top + gateHeight
        );


        ctx.stroke();


        ctx.restore();

    }


    function drawBanners(progress) {

        const phase =
            Math.max(
                0,
                Math.min(
                    1,
                    (progress - 0.165) /
                    0.43
                )
            );


        if (phase <= 0) {
            return;
        }


        banners.forEach(
            (banner, index) => {

                const local =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            (phase -
                                banner.delay * 0.8) /
                            0.72
                        )
                    );


                if (local <= 0) {
                    return;
                }


                const eased =
                    1 -
                    Math.pow(
                        1 - local,
                        3
                    );


                const startY =
                    -banner.height;


                const targetY =
                    canvas.height *
                    0.02;


                const y =
                    startY +
                    (targetY - startY) *
                    eased;


                const x =
                    banner.x -
                    banner.width / 2;


                ctx.save();


                ctx.translate(
                    x + banner.width / 2,
                    y
                );


                ctx.rotate(
                    banner.rotation
                );


                ctx.translate(
                    -banner.width / 2,
                    0
                );


                /* Banner body */

                const gradient =
                    ctx.createLinearGradient(
                        0,
                        0,
                        banner.width,
                        0
                    );


                gradient.addColorStop(
                    0,
                    banner.color
                );


                gradient.addColorStop(
                    0.5,
                    "#14091f"
                );


                gradient.addColorStop(
                    1,
                    banner.color
                );


                ctx.fillStyle =
                    gradient;


                ctx.fillRect(
                    0,
                    0,
                    banner.width,
                    banner.height
                );


                /* Gold border */

                ctx.strokeStyle =
                    "rgba(255,215,120,0.95)";


                ctx.lineWidth = 3;


                ctx.shadowBlur = 18;

                ctx.shadowColor =
                    "rgba(255,190,70,0.85)";


                ctx.strokeRect(
                    2,
                    2,
                    banner.width - 4,
                    banner.height - 4
                );


                /* Inner border */

                ctx.shadowBlur = 0;

                ctx.strokeStyle =
                    "rgba(255,230,160,0.35)";

                ctx.lineWidth = 1;

                ctx.strokeRect(
                    10,
                    10,
                    banner.width - 20,
                    banner.height - 20
                );


                /* Silk diagonal pattern */

                ctx.globalAlpha =
                    0.25;


                ctx.strokeStyle =
                    "#d8a84e";

                ctx.lineWidth = 1;


                const spacing = 28;


                for (
                    let lineX = -banner.height;
                    lineX < banner.width;
                    lineX += spacing
                ) {

                    ctx.beginPath();

                    ctx.moveTo(
                        lineX,
                        0
                    );

                    ctx.lineTo(
                        lineX +
                        banner.height,
                        banner.height
                    );

                    ctx.stroke();

                }


                for (
                    let lineX = 0;
                    lineX < banner.width + banner.height;
                    lineX += spacing
                ) {

                    ctx.beginPath();

                    ctx.moveTo(
                        lineX,
                        0
                    );

                    ctx.lineTo(
                        lineX -
                        banner.height,
                        banner.height
                    );

                    ctx.stroke();

                }


                /* Gold center ornament */

                ctx.globalAlpha =
                    0.35;


                ctx.fillStyle =
                    "#ffd76a";


                ctx.beginPath();


                ctx.arc(
                    banner.width / 2,
                    canvas.height * 0.48,
                    7,
                    0,
                    Math.PI * 2
                );


                ctx.fill();


                ctx.restore();

            }
        );

    }


    function drawParticles(progress) {

        const swarmStart =
            0.16;


        const swarmEnd =
            0.82;


        const swarmProgress =
            Math.max(
                0,
                Math.min(
                    1,
                    (progress - swarmStart) /
                    (swarmEnd - swarmStart)
                )
            );


        if (swarmProgress <= 0) {
            return;
        }


        particles.forEach(
            p => {

                p.angle +=
                    0.012 *
                    p.speed;


                p.rotation +=
                    0.025;


                const radius =
                    p.radius *
                    (0.18 +
                        swarmProgress *
                        0.82);


                const centerX =
                    canvas.width / 2;


                const centerY =
                    canvas.height *
                    (0.48 +
                        Math.sin(
                            p.drift
                        ) *
                        0.08);


                const targetX =
                    centerX +
                    Math.cos(p.angle) *
                    radius;


                const targetY =
                    centerY +
                    Math.sin(p.angle) *
                    radius *
                    0.75;


                p.x +=
                    (targetX - p.x) *
                    0.035;


                p.y +=
                    (targetY - p.y) *
                    0.035;


                const fall =
                    swarmProgress *
                    canvas.height *
                    0.65;


                p.y +=
                    fall *
                    0.002;


                let fill =
                    "#ffb7c5";


                const colorChance =
                    p.depth;


                if (
                    colorChance > 0.72
                ) {

                    fill =
                        "#ffd76a";

                } else if (
                    colorChance > 0.42
                ) {

                    fill =
                        "#ff83b7";

                }


                const fade =
                    progress > 0.78
                        ? Math.max(
                            0,
                            1 -
                            (progress - 0.78) /
                            0.22
                        )
                        : 1;


                ctx.save();


                ctx.globalAlpha =
                    p.alpha * fade;


                ctx.fillStyle =
                    fill;


                ctx.shadowBlur =
                    p.depth > 0.75
                        ? 18
                        : 9;


                ctx.shadowColor =
                    p.depth > 0.75
                        ? "#fff4d0"
                        : "#ff6da8";


                ctx.translate(
                    p.x,
                    p.y
                );


                ctx.rotate(
                    p.rotation
                );


                ctx.beginPath();


                ctx.moveTo(
                    0,
                    -p.size
                );


                ctx.bezierCurveTo(
                    p.size * 1.8,
                    -p.size * 0.3,
                    p.size * 1.4,
                    p.size * 1.5,
                    0,
                    p.size * 2
                );


                ctx.bezierCurveTo(
                    -p.size * 1.4,
                    p.size * 1.5,
                    -p.size * 1.8,
                    -p.size * 0.3,
                    0,
                    -p.size
                );


                ctx.fill();


                ctx.restore();

            }
        );

    }


    function drawGoldenLight(progress) {

        if (progress < 0.595) {
            return;
        }


        const lightProgress =
            Math.min(
                1,
                (progress - 0.595) /
                0.405
            );


        let alpha;


        if (lightProgress < 0.35) {

            alpha =
                lightProgress /
                0.35;

        } else {

            alpha =
                1 -
                (lightProgress - 0.35) /
                0.65;

        }


        alpha =
            Math.max(
                0,
                Math.min(
                    1,
                    alpha
                )
            );


        const gradient =
            ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                0,
                canvas.width / 2,
                canvas.height / 2,
                Math.max(
                    canvas.width,
                    canvas.height
                ) * 0.8
            );


        gradient.addColorStop(
            0,
            `rgba(255,255,245,${alpha})`
        );


        gradient.addColorStop(
            0.2,
            `rgba(255,238,185,${alpha * 0.85})`
        );


        gradient.addColorStop(
            0.55,
            `rgba(255,215,120,${alpha * 0.4})`
        );


        gradient.addColorStop(
            1,
            `rgba(255,255,255,0)`
        );


        ctx.fillStyle =
            gradient;


        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

    }


    /* -----------------------------------------------------
       RENDER
       ----------------------------------------------------- */

    function render(time) {

        const elapsed =
            time - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        /* PHASE 1
           0 - 0.7 seconds
        */

        if (progress <= 0.18) {

            drawRadialAura(
                progress / 0.18
            );

        }


        /* Darken previous scene */

        if (progress > 0.08) {

            const darkness =
                Math.min(
                    0.82,
                    (progress - 0.08) /
                    0.22
                );


            ctx.fillStyle =
                `rgba(8,2,14,${darkness})`;


            ctx.fillRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

        }


        /* Sacred gate */

        drawSacredGate(
            progress
        );


        /* PHASE 2
           banners
        */

        drawBanners(
            progress
        );


        /* Sakura particles */

        drawParticles(
            progress
        );


        /* PHASE 3
           golden-white light
        */

        drawGoldenLight(
            progress
        );


        if (progress < 1) {

            animationFrame =
                requestAnimationFrame(
                    render
                );

        } else {

            if (!completed) {

                completed = true;


                canvas.style.opacity =
                    "0";


                if (animationFrame) {

                    cancelAnimationFrame(
                        animationFrame
                    );

                }


                setTimeout(() => {

                    if (onComplete) {
                        onComplete();
                    }

                }, 120);

            }

        }

    }


    requestAnimationFrame(
        render
    );

}


/* =========================================================
   REVEAL SCENE 6
   ========================================================= */

function revealScene6(answer) {

    const scene6 =
        document.getElementById(
            "scene6"
        );


    if (!scene6) {
        return;
    }


    scene6.dataset.answer =
        answer;


    proposalSection.style.display =
        "none";


    proposalSection.classList.remove(
        "show"
    );


    scene6.classList.add(
        "visible"
    );


    createFinalPetalShower();

}


/* =========================================================
   FINAL SCENE PETAL SHOWER
   ========================================================= */

function createFinalPetalShower() {

    const layer =
        document.querySelector(
            ".scene6-petals"
        );


    if (!layer) {
        return;
    }


    for (let i = 0; i < 35; i++) {

        const petal =
            document.createElement("span");


        petal.textContent =
            Math.random() > 0.25
                ? "🌸"
                : "✦";


        petal.style.position =
            "absolute";


        petal.style.left =
            `${Math.random() * 100}%`;


        petal.style.top =
            `${-10 - Math.random() * 30}%`;


        petal.style.fontSize =
            `${12 + Math.random() * 22}px`;


        petal.style.opacity =
            `${0.35 + Math.random() * 0.65}`;


        petal.style.filter =
            "drop-shadow(0 0 8px rgba(255,215,150,0.8))";


        petal.style.animation =
            `scene6IndividualPetal
             ${5 + Math.random() * 6}s
             linear
             ${Math.random() * 3}s
             forwards`;


        layer.appendChild(
            petal
        );

    }


    if (
        !document.getElementById(
            "scene6PetalAnimation"
        )
    ) {

        const style =
            document.createElement("style");


        style.id =
            "scene6PetalAnimation";


        style.textContent = `

            @keyframes scene6IndividualPetal {

                0% {
                    transform:
                        translateY(0)
                        rotate(0deg);
                }

                100% {
                    transform:
                        translateY(130vh)
                        rotate(540deg);
                }

            }

        `;


        document.head.appendChild(
            style
        );

    }

}


/* =========================================================
   RESIZE CANVAS
   ========================================================= */

function resizeBankaiCanvas() {

    if (!bankaiCanvas) {
        return;
    }


    const dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    bankaiCanvas.width =
        window.innerWidth * dpr;


    bankaiCanvas.height =
        window.innerHeight * dpr;


    bankaiCanvas.style.width =
        `${window.innerWidth}px`;


    bankaiCanvas.style.height =
        `${window.innerHeight}px`;


    const ctx =
        bankaiCanvas.getContext("2d");


    if (ctx) {

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

    }

}


window.addEventListener(
    "resize",
    () => {

        resizeBankaiCanvas();

    }
);


/* =========================================================
   FINAL BUTTON VISUAL FEEDBACK
   ========================================================= */

function addButtonPulse(button) {

    if (!button) {
        return;
    }


    button.addEventListener(
        "mouseenter",
        () => {

            button.style.filter =
                "brightness(1.15)";

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.filter =
                "";

        }
    );

}


addButtonPulse(yesBtn);
addButtonPulse(alwaysBtn);


/* =========================================================
   PAGE LOAD
   ========================================================= */

window.addEventListener(
    "load",
    () => {

        resizeBankaiCanvas();

        console.log(
            "🌸 Sakura proposal website loaded successfully."
        );

        console.log(
            "💖 Final Bankai transition is ready."
        );

    }
);
