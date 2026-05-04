
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

        // Phase 04 : Like Mechanism :

        setUpLikes();

     } catch (error) {
        console.log("Error :", error.message);
     }
}

if (document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}


// Likes Feature :


function setUpLikes() {

    const heartButton = document.querySelectorAll('.right__cta');

    heartButton.forEach((button) => {
        const buttonId = button.getAttribute('postId');
        const count = button.querySelector('.count');

        // Load like counts from localstorage :

        const savedLikes = localStorage.getItem(`likes_${buttonId}`);
        const likeCount = savedLikes ? parseInt(savedLikes) : 0;
        count.textContent = likeCount;

        // if user already liked :

        const userLiked = localStorage.getItem(`liked_${buttonId}`);

        if (userLiked === 'true') {
            button.classList.add('liked');
        }


        // clike handler :

        button.addEventListener('click', () => {

            const currentLikes = parseInt(count.textContent);
            const isLiked = button.classList.contains('liked');


            if (isLiked) {
                button.classList.remove('liked');
                count.textContent = currentLikes - 1;

                localStorage.setItem(`likes_${buttonId}`, currentLikes - 1);
                localStorage.setItem(`liked_${buttonId}`, 'false');
            } else {
                button.classList.add('liked');
                count.textContent = currentLikes + 1;

                localStorage.setItem(`likes_${buttonId}`, currentLikes + 1);
                localStorage.setItem(`liked_${buttonId}`, 'true');
            }
        });
    });

    console.log('Likes setup complete...');
}



