

// Dark Mode Switcher 

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


// Like Mechanism :

const likeIcon = document.querySelectorAll('.right__cta i');
let likeDone = false;

function LikeMech() {

    likeIcon.forEach((icon) => {
        icon.addEventListener('click', () => {
            if(likeDone === false) {
                icon.classList.add('like');
                likeDone = true;
            } else {
                icon.classList.remove('like');
                likeDone = false;
            }
        })
    })
};

LikeMech();


// GSAP ANIMATION FOR MARQUE TICKERS :

window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
        gsap.to(".ticker__text", {
            transform: "translateX(-400%)",
            duration: 8,
            repeat: -1,
            ease: "none"
        });

        gsap.to(".ticker__text i", {
            rotate: 180,
            ease: "power-2"
        })
    } else {
        gsap.to(".ticker__text", {
            transform: "translateX(-100%)",
            duration: 2,
            repeat: -1,
            ease: "none"
        });

        gsap.to(".ticker__text i", {
            rotate: 0,
            ease: "power-2"
        })
    }
});



