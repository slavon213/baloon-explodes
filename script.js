const baloon = document.getElementById("baloon");
const box = document.querySelector(".box");

const arrowUp = document.querySelector(".arrow.up");
const arrowDown = document.querySelector(".arrow.down");
const arrowLeft = document.querySelector(".arrow.left");
const arrowRight = document.querySelector(".arrow.right");

// arrowRight.classList.toggle('pressed');
// arrowRight.classList.toggle('pressed');


document.body.addEventListener('keydown', function(e){
    // e.preventDefault()
    switch (e.key) {
        case "ArrowUp":
            arrowUp.classList.add("pressed");
            break;
        case "ArrowDown":
            arrowDown.classList.add("pressed");
            break;
        case "ArrowRight":
            arrowRight.classList.add("pressed");
            break;
        case "ArrowLeft":
            arrowLeft.classList.add("pressed");
            break;
        default:
            break;
    }
})


document.body.addEventListener("keyup", function (e) {
    switch (e.key) {
        case "ArrowUp":
            arrowUp.classList.remove("pressed");
            break;
        case "ArrowDown":
            arrowDown.classList.remove("pressed");
            break;
        case "ArrowRight":
            arrowRight.classList.remove("pressed");
            break;
        case "ArrowLeft":
            arrowLeft.classList.remove("pressed");
            break;
        default:
            break;
    }
});
