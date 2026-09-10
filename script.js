const beginButton = document.getElementById("beginButton");
const container = document.querySelector(".container");
const storySection = document.getElementById("storySection");

beginButton.addEventListener("click", function () {

    container.classList.add("fade-out");

    storySection.classList.add("show");

});
