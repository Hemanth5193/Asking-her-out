document.addEventListener("DOMContentLoaded", () => {
    // Cache DOM Elements
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
    const attachedPetalsContainer = document.getElementById("attachedPetals");
    const sakuraBloomAura = document.getElementById("sakuraBloomAura");
    const readyForItBtn = document.getElementById("readyForItBtn");

    const proposalSection = document.getElementById("proposalSection");
    const yesBtn = document.getElementById("yesBtn");
    const alwaysBtn = document.getElementById("alwaysBtn");

    // Viewport bounds cache
    let vw = window.innerWidth;
    let vh = window.innerHeight;

    window.addEventListener("resize", () => {
        vw = window.innerWidth;
        vh = window.innerHeight;
    });

    let moveInterval = null;
    let activePetals = [];
    let freeMovingPetals = [];
    let scene4AnimFrame = null;
    let caughtCount = 0;
    let scene4CaughtCount = 0;
    let proposalTriggered = false;

    // Data Constants
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
    const scene4Qualities = ["Kind", "Beautiful", "Strong", "Funny", "Elegant"];

    // Helper SVG Component Generator
    function createSakuraPetalSVG() {
        return `<svg class="sakura-svg-petal" viewBox="0 0 100 130"><use href="#sakura-petal-symbol"></use></svg>`;
    }

    // ========================================
    // SCENE 1 & 2 TRANSITIONS & TIMINGS
    // ========================================

    beginButton.addEventListener("click", () => {
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
        const maxX = Math.min(vw - 80, 280);
        const maxY = Math.min(vh - 80, 180);

        const randomX = (Math.random() - 0.5) * maxX;
        const randomY = (Math.random() - 0.5) * maxY;

        sakuraBtn.style.transform = `translate3d(${randomX}px, ${randomY}px, 0) scale(1.1)`;
    }

    sakuraBtn.addEventListener("click", () => {
        if (moveInterval) clearInterval(moveInterval);
        scene2Intro.style.display = "none";
        poemContainer.classList.remove("hidden");
        poemContainer.classList.add("fade-in");
    });

    nextToScene3Btn.addEventListener("click", () => {
        triggerPetalTransition(() => {
            storySection.classList.remove("show");
            storySection.style.display = "none";
            gameSection.classList.add("show");
        });
    });

    function triggerPetalTransition(callback) {
        petalTransition.innerHTML = "";
        const petalCount = vw > 768 ? 80 : 45;
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement("div");
            petal.classList.add("transition-petal");
            petal.style.left = `${Math.random() * 100}vw`;
            petal.style.animationDuration = `${1.2 + Math.random() * 1.2}s`;
            petal.style.animationDelay = `${Math.random() * 0.5}s`;
            fragment.appendChild(petal);
        }

        petalTransition.appendChild(fragment);

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

    function initRainbowGame() {
        rainbowContainer.innerHTML = "";
        activePetals = [];
        caughtCount = 0;
        counterBadge.textContent = `Blossoms Caught: 0 / 7`;

        const fragment = document.createDocumentFragment();

        for (let i = 0; i < 7; i++) {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.classList.add("rainbow-sakura", `vibgyor-${vibgyorColors[i]}`);
            btn.innerHTML = "🌸";
            btn.setAttribute("data-index", i);
            
            setRandomInitialPosition(btn);
            fragment.appendChild(btn);

            const petalObj = {
                element: btn,
                interval: setInterval(() => glidePetal(btn), 900 + Math.random() * 400)
            };
            activePetals.push(petalObj);

            btn.addEventListener("click", () => handlePetalCatch(btn, i));
        }

        rainbowContainer.appendChild(fragment);
    }

    function setRandomInitialPosition(element) {
        const marginX = 80;
        const marginY = 120;
        const startX = marginX + Math.random() * (vw - marginX * 2);
        const startY = marginY + Math.random() * (vh - marginY * 2);
        
        element.style.left = `${startX}px`;
        element.style.top = `${startY}px`;
        element.style.transform = `translate3d(0, 0, 0) scale(1)`;
    }

    function glidePetal(element) {
        if (element.classList.contains("caught")) return;

        const currentLeft = parseFloat(element.style.left);
        const currentTop = parseFloat(element.style.top);

        const moveRangeX = vw > 768 ? 240 : 130;
        const moveRangeY = vh > 768 ? 200 : 110;

        let deltaX = (Math.random() - 0.5) * moveRangeX;
        let deltaY = (Math.random() - 0.5) * moveRangeY;

        if (currentLeft + deltaX < 60 || currentLeft + deltaX > vw - 80) {
            deltaX *= -1;
        }
        if (currentTop + deltaY < 100 || currentTop + deltaY > vh - 100) {
            deltaY *= -1;
        }

        element.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${0.95 + Math.random() * 0.15})`;
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
    // SCENE 4: FIXED SAKURA PUZZLE ENGINE
    // ========================================

    // ========================================
    // SCENE 4: SAKURA PUZZLE ENGINE (RESTORED)
    // ========================================

    function initScene4Puzzle() {
        scene4Section.classList.add("show");
        floatingPetalsLayer.innerHTML = "";
        attachedPetalsContainer.innerHTML = "";
        sakuraBloomAura.classList.remove("active");
        
        freeMovingPetals = [];
        scene4CaughtCount = 0;

        const fragment = document.createDocumentFragment();

        scene4Qualities.forEach((quality, index) => {
            const petalWrap = document.createElement("div");
            petalWrap.classList.add("floating-petal-wrapper");
            petalWrap.innerHTML = createSakuraPetalSVG();

            const marginX = 80;
            const marginY = 100;
            const initialX = marginX + Math.random() * (vw - marginX * 2);
            const initialY = marginY + Math.random() * (vh - marginY * 2);

            petalWrap.style.left = `${initialX}px`;
            petalWrap.style.top = `${initialY}px`;

            fragment.appendChild(petalWrap);

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
                active: true
            };

            freeMovingPetals.push(petalObj);

            petalWrap.addEventListener("click", () => handleCatchScene4Petal(petalObj));
        });

        floatingPetalsLayer.appendChild(fragment);

        if (scene4AnimFrame) cancelAnimationFrame(scene4AnimFrame);
        renderFreePetals();
    }

    function renderFreePetals() {
        let hasActive = false;

        freeMovingPetals.forEach(p => {
            if (!p.active) return;
            hasActive = true;

            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.vRot;

            if (p.x < 40 || p.x > vw - 100) p.vx *= -1;
            if (p.y < 60 || p.y > vh - 120) p.vy *= -1;

            if (Math.random() < 0.05) {
                p.vx += (Math.random() - 0.5) * 1.2;
                p.vy += (Math.random() - 0.5) * 1.2;
                
                p.vx = Math.max(-2.5, Math.min(2.5, p.vx));
                p.vy = Math.max(-2.5, Math.min(2.5, p.vy));
            }

            p.element.style.left = `${p.x}px`;
            p.element.style.top = `${p.y}px`;
            p.element.style.transform = `rotate(${p.rotation}deg) scale(${0.9 + Math.sin(Date.now() / 400) * 0.08})`;
        });

        if (hasActive) {
            scene4AnimFrame = requestAnimationFrame(renderFreePetals);
        }
    }

    function handleCatchScene4Petal(p) {
        if (!p.active) return;
        p.active = false;
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
        attachedPetalsContainer.appendChild(petalWrap);
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
        }, 800);
    }
    // ========================================
    // TRANSITION FROM SCENE 4 TO SCENE 5
    // ========================================

    if (readyForItBtn) {
        readyForItBtn.addEventListener("click", () => {
            scene4Section.classList.remove("show");
            scene4Section.classList.add("fade-out");

            setTimeout(() => {
                scene4Section.style.display = "none";
                
                triggerBankaiTransition(() => {
                    proposalSection.classList.remove("hidden");
                    proposalSection.classList.add("show");
                });
            }, 800);
        });
    }

    // ========================================
    // SENBONZAKURA BANKAI TRANSITION ENGINE
    // ========================================

    function triggerBankaiTransition(onComplete) {
        const canvas = document.getElementById('bankaiCanvas');
        const ctx = canvas.getContext('2d');

        canvas.width = vw;
        canvas.height = vh;
        canvas.style.opacity = '1';

        let animationFrame;
        const startTime = performance.now();
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

    // ========================================
    // GRAND PROPOSAL FINALE TRANSITION SEQUENCE
    // ========================================

    if (yesBtn) yesBtn.addEventListener("click", startProposalFinaleSequence);
    if (alwaysBtn) alwaysBtn.addEventListener("click", startProposalFinaleSequence);

    function startProposalFinaleSequence() {
        if (proposalTriggered) return;
        proposalTriggered = true;

        const crimsonAura = document.getElementById("crimsonAura");
        const bannerCascade = document.getElementById("bannerCascade");
        const petalRainContainer = document.getElementById("proposalPetalRain");
        const sacredFlash = document.getElementById("sacredFlash");
        const scene6Section = document.getElementById("scene6Section");

        // PHASE 1: Realm Tremor & Crimson Aura (0.0s - 0.7s)
        document.body.classList.add("realm-tremor");
        crimsonAura.classList.add("active");

        setTimeout(() => {
            document.body.classList.remove("realm-tremor");
        }, 600);

        // PHASE 2: Kimono Banner Cascade & Gold Lattice + Petal Rain (0.7s - 2.5s)
        setTimeout(() => {
            bannerCascade.classList.add("active");
            spawnProposalPetalRain(petalRainContainer);
        }, 700);

        // PHASE 3: Sacred Light Burst into Proposal (2.5s - 4.2s)
        setTimeout(() => {
            sacredFlash.classList.add("active");
        }, 2500);

        setTimeout(() => {
            proposalSection.classList.remove("show");
            proposalSection.classList.add("hidden");

            scene6Section.classList.remove("hidden");
            scene6Section.classList.add("show");

            setTimeout(() => {
                sacredFlash.classList.remove("active");
                crimsonAura.classList.remove("active");
                bannerCascade.classList.remove("active");
                petalRainContainer.innerHTML = "";
            }, 500);
        }, 3500);
    }

    function spawnProposalPetalRain(container) {
        container.innerHTML = "";
        const totalPetals = 300;
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < totalPetals; i++) {
            const petal = document.createElement("div");
            const isGold = Math.random() > 0.5;
            
            petal.classList.add("proposal-rain-petal", isGold ? "gold" : "pink");
            petal.style.left = `${Math.random() * 100}vw`;
            petal.style.animationDuration = `${1.2 + Math.random() * 1.5}s`;
            petal.style.animationDelay = `${Math.random() * 1.2}s`;
            
            fragment.appendChild(petal);
        }

        container.appendChild(fragment);
    }
});
