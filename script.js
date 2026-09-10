const beginButton = document.getElementById("beginButton");
const introContainer = document.getElementById("introContainer");
const storySection = document.getElementById("storySection");

beginButton.addEventListener("click", function () {
    // Fade out Scene 1
    introContainer.classList.add("fade-out");

    // Wait for the fade-out animation to complete, then display Scene 2
    setTimeout(() => {
        introContainer.style.display = "none";
        storySection.classList.add("show");
    }, 800);
});
