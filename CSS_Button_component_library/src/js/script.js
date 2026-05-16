
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
    btn.addEventListener('click', async () => {
      // Get the postId from parent .right__cta
      const postId = btn.closest('.card').querySelector('.right__cta').getAttribute('postId');
      
      // Find matching button data
      const buttonData = buttonsData.find(b => b.id === postId);

      if (buttonData) {
        try {
          // Format and highlight code
          const formattedHtml = await formatAndHighlight(buttonData.html, 'html');
          const formattedCss = await formatAndHighlight(buttonData.css, 'css');
          
          htmlCodeDiv.innerHTML = formattedHtml;
          cssCodeDiv.innerHTML = formattedCss;
          
          // Store original unformatted code for copying
          htmlCodeDiv.dataset.originalCode = buttonData.html;
          cssCodeDiv.dataset.originalCode = buttonData.css;
          
          btnTitle.textContent = buttonData.title;
          btnDesc.textContent = buttonData.description;
          codeOverlay.classList.add('active');
          document.body.style.overflow = 'hidden';
        } catch (error) {
          console.error('Error formatting code:', error);
          // Fallback to plain text if formatting fails
          htmlCodeDiv.textContent = buttonData.html;
          cssCodeDiv.textContent = buttonData.css;
          codeOverlay.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      }
    });
  });

  codeClose.addEventListener('click', () => {
    codeOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  codeOverlay.addEventListener('click', (e) => {
    if (e.target === codeOverlay) {
      codeOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  copyHtmlBtn.addEventListener('click', () => {
    const originalCode = htmlCodeDiv.dataset.originalCode || getPlainText(htmlCodeDiv);
    copyToClipboard(originalCode, copyHtmlBtn);
  });

  copyCssBtn.addEventListener('click', () => {
    const originalCode = cssCodeDiv.dataset.originalCode || getPlainText(cssCodeDiv);
    copyToClipboard(originalCode, copyCssBtn);
  });
 
}

// Format code with Prettier and highlight with Highlight.js
async function formatAndHighlight(code, language) {
  try {
    // Format code with Prettier - matching VS Code default settings
    let formatted = code;
    
    if (language === 'html') {
      formatted = await prettier.format(code, {
        parser: 'html',
        plugins: [prettierPlugins.html],
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: false,
        trailingComma: 'es5',
        bracketSpacing: true,
        arrowParens: 'always',
        htmlWhitespaceSensitivity: 'css'
      });
    } else if (language === 'css') {
      formatted = await prettier.format(code, {
        parser: 'css',
        plugins: [prettierPlugins.css],
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: false,
        trailingComma: 'es5'
      });
    }
    

    const preElement = document.createElement('pre');
    preElement.innerHTML = '<code class="language-' + language + '">' + 
      hljs.highlight(formatted.trim(), { language }).value + 
      '</code>';
    
    return preElement.innerHTML;
  } catch (error) {
    console.error('Formatting error:', error);
    // Fallback to just highlighting if prettier fails
    const preElement = document.createElement('pre');
    preElement.innerHTML = '<code class="language-' + language + '">' + 
      hljs.highlight(code.trim(), { language }).value + 
      '</code>';
    
    return preElement.innerHTML;
  }
}

function getPlainText(element) {
  if (element.dataset.originalCode) {
    return element.dataset.originalCode;
  }

  const clone = element.cloneNode(true);
  const spans = clone.querySelectorAll('span');
  spans.forEach(span => {
    const text = document.createTextNode(span.textContent);
    span.replaceWith(text);
  });
  
  const codeTag = clone.querySelector('code');
  return (codeTag ? codeTag.textContent : clone.textContent).trim();
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


