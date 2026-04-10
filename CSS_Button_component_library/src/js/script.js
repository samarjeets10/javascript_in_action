
import { featchbutton } from "./services/fetchButton";
import { renderButtons } from "./render/renderButton";


async function init() {
    const container = document.querySelector('.components__container');

    const buttons = await featchbutton();
    renderButtons(buttons, container);

    console.log("Init is running!!");
}

init();

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

window.addEventListener('load', function() {

    const allLikeBtn = document.querySelectorAll('.right__cta i');

    allLikeBtn.forEach(function(button) {
        const postId = button.getAttribute('postId');
        loadLike(button, postId);
    })
});


document.addEventListener('click', function(event) {
    const button = event.target.closest('.right__cta');
    if(button) {
        toggleLike(button, postId);
    }
});


function toggleLike(button, postId) {

    // get saved data :

    let likeData = JSON.parse(localStorage.getItem(postId)) || {count: 0, liked: false};

    // if alredy liked 

    if (likeData.liked) {
        likeData.count--;
        likeData.liked = false;
    } else {    // if not Liked 
        likeData.count++;
        likeData.liked = true;
    }

    localStorage.setItem(postId, JSON.stringify(likeData));
    loadLike(button, postId);
}


function loadLike(button, postId) {

    const likeData = JSON.parse(localStorage.getItem(postId)) || {count: 0, liked: false};

    button.querySelector('.count').innerText = likeData.count;

    // change btn style :

    if (likeData.liked) {
        button.classList.add('like');
    } else {
        button.classList.remove('like');
    }
}



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


// Card creation and data fetching :
// 
// get data :

async function getCardData() {
    const response = await fetch('../data/buttonsData.json');
    const data = await response.json();
    console.log(data);

    return data;
}

const wrapper = document.querySelector('.components__container');

console.log(wrapper);

function createCard(data) {

    data.forEach(button => {
        const card = document.createElement('div');

        card.innerHTML = `
                            <div class="card">
                                <div class="preview__box">
                                    <div class="copy__code">
                                        <i class="ri-code-s-slash-line"></i>
                                        <p>get code</p>
                                    </div>
                                    ${button.html}
                                </div>

                                <div class="card__text__content">
                                    <div class="left__text">
                                        <h3>${button.name}</h3>
                                        <p>${button.description}</p>
                                    </div>
                                    <div class="right__cta" postId="post1">
                                        <i class="fa fa-heart heart-fa"></i>
                                        <span class="count">0</span>
                                    </div>
                                </div>
                            </div>
                        `;
        wrapper.appendChild(card);
    });
}

async function init() {
    const buttonData = await getCardData();
    createCard(buttonData);
}
    

init();



