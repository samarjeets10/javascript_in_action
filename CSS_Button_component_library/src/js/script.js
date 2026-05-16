
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

        // Phase 05 : Get Code Mechanism:
        setupGetCode(buttonData);

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



function setupGetCode(buttonsData) {
 
  const codeOverlay = document.getElementById('codeOverlay');
  const codeClose = document.getElementById('codeClose');
  const copyHtmlBtn = document.getElementById('copyHtml');
  const copyCssBtn = document.getElementById('copyCss');
  const htmlCodeDiv = document.getElementById('htmlCode');
  const cssCodeDiv = document.getElementById('cssCode');
  const btnTitle = document.getElementById('btn-title');
  const btnDesc = document.getElementById('btn-description');
 
  const getCodeButtons = document.querySelectorAll('.copy__code');
 
  getCodeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Get the postId from parent .right__cta
      const postId = btn.closest('.card').querySelector('.right__cta').getAttribute('postId');
      
      // Find matching button data
      const buttonData = buttonsData.find(b => b.id === postId);

      if (buttonData) {
        htmlCodeDiv.textContent = buttonData.html;
        cssCodeDiv.textContent = buttonData.css;
        btnTitle.textContent = buttonData.title;
        btnDesc.textContent = buttonData.description;
        codeOverlay.classList.add('active');
      }
    });
  });

  codeClose.addEventListener('click', () => {
    codeOverlay.classList.remove('active');
  });

  codeOverlay.addEventListener('click', (e) => {
    if (e.target === codeOverlay) {
      codeOverlay.classList.remove('active');
    }
  });

  copyHtmlBtn.addEventListener('click', () => {
    copyToClipboard(htmlCodeDiv.textContent, copyHtmlBtn);
  });

  copyCssBtn.addEventListener('click', () => {
    copyToClipboard(cssCodeDiv.textContent, copyCssBtn);
  });
 
}
 
function copyToClipboard(text, button) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = button.innerHTML;
    button.innerHTML = `<i class="ri-file-check-line"></i> copied`;
 
    setTimeout(() => {
      button.innerHTML = originalText;
    }, 2000);
  });
}


