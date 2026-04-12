
import { initDarkMode } from "./modules/darkMode.js";
import { dataFetcher } from "./services/dataFetcher.js";
import { cardRenderar } from "./modules/cardRenderar.js";


async function initializeApp() {
     try {

        // phase 01 : Dark Mode or theme :
        const ThemeMode = await initDarkMode();
        console.log();

        // Phase 02 : Featching Buttons Data :
        const buttonData = await dataFetcher();
        const wrapper = document.querySelector('.components__container');

        // Phase 03 : Card rendering :
        await cardRenderar(buttonData, wrapper);



     } catch (error) {
        console.log("Error :", error.message);
     }
}

if (document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
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




