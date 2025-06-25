const baloon = document.getElementById("baloon");
const baloonCssSize = getComputedStyle(document.documentElement).getPropertyValue("--baloon-main-size").trim();

const baloonMinSize = parseInt(baloonCssSize) || 56;
const box = document.querySelector(".box");

const arrowUp = document.querySelector(".arrow.up");
const arrowDown = document.querySelector(".arrow.down");
const arrowLeft = document.querySelector(".arrow.left");
const arrowRight = document.querySelector(".arrow.right");


function pressUp(e) {
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
}

function pressDown(e) {
    
    switch (e.key) {
        case "ArrowUp":
            arrowUp.classList.remove("pressed");
            increaseSize();
            break;
        case "ArrowDown":
            arrowDown.classList.remove("pressed");
            decreaseSize();
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
}

document.body.addEventListener("keydown", pressUp);

document.body.addEventListener("keyup", pressDown);

const getSize = function (element) {
    return parseInt(window.getComputedStyle(element).fontSize);
};

const increaseSize = function () {
    if (canExpand(box, baloon)) {
        let increasePercent = 1.1;
        baloon.style.fontSize = `${getSize(baloon) * increasePercent}px`;
    }
};

const decreaseSize = function () {
    let decreasePercent = 0.9;
    if (getSize(baloon) >= baloonMinSize) {
        baloon.style.fontSize = `${getSize(baloon) * decreasePercent}px`;
    }
};

const canExpand = function (container, element) {
    const { top: topBox, bottom: bottomBox } = container.getClientRects()[0];
    const { top: topElement, bottom: bottomElement } = element.getClientRects()[0];
    if (topElement > topBox && bottomElement < bottomBox) {
        console.log("can expand");
        return true;
    } else {
        console.log("ba-bax");
        return false;
    }
};

const explode = function () {};
