/**
 * @type {HTMLElement} Балон, який змінює розмір
 */
const baloon = document.getElementById("baloon");

/**
 * @type {string} Розмір балону, отриманий з CSS-змінної
 * @example "--baloon-main-size: 80px;"
 */
const baloonCssSize = getComputedStyle(document.documentElement).getPropertyValue("--baloon-main-size").trim();

/**
 * @type {number} Мінімальний дозволений розмір балону в пікселях
 * @default 56
 */
const baloonMinSize = parseInt(baloonCssSize) || 56;

/**
 * @type {HTMLElement} Контейнер, в якому міститься балон
 */
const box = document.querySelector(".box");

/**
 * @type {HTMLElement} Елемент "Стрілка вгору"
 */
const arrowUp = document.querySelector(".arrow.up");

/**
 * @type {HTMLElement} Елемент "Стрілка вниз"
 */
const arrowDown = document.querySelector(".arrow.down");

/**
 * @type {HTMLElement} Елемент "Стрілка вліво"
 */
const arrowLeft = document.querySelector(".arrow.left");

/**
 * @type {HTMLElement} Елемент "Стрілка вправо"
 */
const arrowRight = document.querySelector(".arrow.right");

/**
 * Додає клас 'pressed' до елемента
 * @param {HTMLElement} element - Елемент, до якого додається клас
 */
function addPressed(element) {
    element.classList.add("pressed");
}

/**
 * Видаляє клас 'pressed' з елемента
 * @param {HTMLElement} element - Елемент, з якого видаляється клас
 */
function removePressed(element) {
    element.classList.remove("pressed");
}

/**
 * Обробка натискання клавіш для керування балоном
 * @param {KeyboardEvent} e - Подія натискання клавіші
 */
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

/**
 * Обробка відпускання клавіш
 * @param {KeyboardEvent} e - Подія відпускання клавіші
 */
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

/**
 * Обробка натискання на елементі "Стрілка вгору"
 * @param {MouseEvent} e - Подія кліку мишою
 */
function clickArrowUp() {
    increaseSizeOrExplode();
}

/**
 * Обробка натискання на елементі "Стрілка вниз"
 * @param {MouseEvent} e - Подія кліку мишою
 */
function clickArrowDown() {
    decreaseSize();
}

/**
 * Додає обробник події натискання клавіші на всьому тілі документа.
 * Викликає функцію pressDown при натисканні стрілок на клавіатурі.
 *
 * @see pressDown
 */
document.body.addEventListener("keydown", pressDown);

/**
 * Додає обробник події відпускання клавіші.
 * Викликає функцію pressUp для обробки відповідного візуального ефекту.
 *
 * @see pressUp
 */
document.body.addEventListener("keyup", pressUp);

/**
 * Додає обробник кліку по стрілці вгору.
 * Збільшує розмір балону або викликає анімацію вибуху.
 *
 * @see clickArrowUp
 */
arrowUp.addEventListener("click", clickArrowUp);

/**
 * Додає обробник кліку по стрілці вниз.
 * Зменшує розмір балону.
 *
 * @see clickArrowDown
 */
arrowDown.addEventListener("click", clickArrowDown);

/**
 * Отримує значення розміру шрифту в елементі
 * @param {HTMLElement} element
 * @returns {number} Розмір шрифту елемента в пікселях.
 *
 * @example
 * const heading = document.querySelector("p");
 * const size = getSize(heading); // 32
 */
const getSize = function (element) {
    return parseInt(window.getComputedStyle(element).fontSize);
};

/**
 * Збільшує розмір балону або активує анімацію вибуху, якщо розмір перевищено
 */
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

/**
 * Зменшує розмір балону (до певної межі)
 */
const decreaseSize = function () {
    let decreasePercent = 0.9;
    if (getSize(baloon) >= baloonMinSize) {
        baloon.style.fontSize = `${getSize(baloon) * decreasePercent}px`;
    }
};

/**
 * Визначає, чи можна ще збільшити розмір елемента в межах контейнера
 * @param {HTMLElement} container - Контейнер, що обмежує розмір
 * @param {HTMLElement} element - Балон
 * @returns {boolean} true, якщо розширення можливе
 */
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

/**
 * Видаляє слухачі подій, щоб зупинити взаємодію з балоном
 */
const removeListeners = function () {
    document.body.removeEventListener("keyup", pressUp);
    document.body.removeEventListener("keydown", pressDown);
    arrowUp.removeEventListener("click", clickArrowUp);
    arrowDown.removeEventListener("click", clickArrowDown);
};

/**
 * Здійснює анімацію вибуху та оновлення інтерфейсу
 */
const explode = function () {
    baloon.textContent = "💥";
    baloon.style.animation = "explode 0.8s ease-out forwards";
    setTimeout(() => {
        baloon.remove();
    }, 800);
    setTimeout(showFinal, 800);
};

/**
 * Показує фінальний текст і зображення після вибуху
 */
const showFinal = function () {
    const para = document.createElement("p");
    const clown = document.createElement("img");

    para.textContent = "Ну от! Я ж казав!";
    clown.setAttribute("src", "./images/clown_sad.png");
    box.appendChild(clown);
    box.appendChild(para);
};
