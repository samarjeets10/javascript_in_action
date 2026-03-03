

// Dark Mode switcher

const button = document.querySelector(".inner__box");
const body = document.querySelector("body");

let modeOn = false;

button.addEventListener('click', ()=> {
    if (modeOn === false) {
        darkModeOn();
        body.classList.add('mode__dark');
    } else {
        darkModeOff();
        body.classList.remove('mode__dark');
    }
});

function darkModeOn() {
    button.classList.add('dark');
    modeOn = true;
}

function darkModeOff() {
    button.classList.remove('dark');
    modeOn = false;
}