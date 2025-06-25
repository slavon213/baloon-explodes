const baloon = document.getElementById("baloon");
const baloonCssSize = getComputedStyle(document.documentElement).getPropertyValue("--baloon-main-size").trim();

const baloonMinSize = parseInt(baloonCssSize) || 56;
const box = document.querySelector(".box");

const arrowUp = document.querySelector(".arrow.up");
const arrowDown = document.querySelector(".arrow.down");
const arrowLeft = document.querySelector(".arrow.left");
const arrowRight = document.querySelector(".arrow.right");

function addPressed(element) {
    element.classList.add("pressed");
}

function removePressed(element) {
    element.classList.remove("pressed");
}

function pressDown(e) {
    switch (e.key) {
        case "ArrowUp":
            addPressed(arrowUp);
            increaseSizeOrExplode();
            break;
        case "ArrowDown":
            addPressed(arrowDown);
            decreaseSize();
            break;
        case "ArrowRight":
            addPressed(arrowRight);
            break;
        case "ArrowLeft":
            addPressed(arrowLeft);
            break;
        default:
            break;
    }
}

function pressUp(e) {
    switch (e.key) {
        case "ArrowUp":
            removePressed(arrowUp);
            arrowUp.classList.remove("pressed");
            break;
        case "ArrowDown":
            removePressed(arrowDown);
            break;
        case "ArrowRight":
            removePressed(arrowRight);
            break;
        case "ArrowLeft":
            removePressed(arrowLeft);
            break;
        default:
            break;
    }
}

function clickArrowUp() {
    increaseSizeOrExplode();
}
function clickArrowDown() {
    decreaseSize();
}

document.body.addEventListener("keydown", pressDown);
document.body.addEventListener("keyup", pressUp);

arrowUp.addEventListener("click", clickArrowUp);
arrowDown.addEventListener("click", clickArrowDown);

const getSize = function (element) {
    return parseInt(window.getComputedStyle(element).fontSize);
};

const increaseSizeOrExplode = function () {
    if (canExpand(box, baloon)) {
        let increasePercent = 1.1;
        baloon.style.fontSize = `${getSize(baloon) * increasePercent}px`;
    } else {
        removeListeners();
        removePressed(arrowUp);
        explode();
    }
};

const decreaseSize = function () {
    let decreasePercent = 0.9;
    if (getSize(baloon) >= baloonMinSize) {
        baloon.style.fontSize = `${getSize(baloon) * decreasePercent}px`;
    }
};

const canExpand = function (container, element) {
    const topOffset = 10;
    const { top: topElement, bottom: bottomElement } = element.getClientRects()[0];
    const { top: topBox, bottom: bottomBox } = container.getClientRects()[0];

    if (topElement > topBox + topOffset && bottomElement < bottomBox) {
        return true;
    } else {
        return false;
    }
};

const removeListeners = function () {
    document.body.removeEventListener("keyup", pressUp);
    document.body.removeEventListener("keydown", pressDown);
    arrowUp.removeEventListener("click", clickArrowUp);
    arrowDown.removeEventListener("click", clickArrowDown);
};

const explode = function () {
    baloon.textContent = "💥";
    baloon.style.animation = "explode 0.8s ease-out forwards";
    setTimeout(() => {
        baloon.remove();
    }, 800);
    setTimeout(showFinal, 800);
};

const showFinal = function () {
    const para = document.createElement("p");
    const clown = document.createElement("img");

    para.textContent = "Ну от! Я ж казав!";
    clown.setAttribute("src", "./images/clown_sad.png");
    box.appendChild(clown);
    box.appendChild(para);
};
