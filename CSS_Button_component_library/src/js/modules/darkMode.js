
export async function initDarkMode() {

    try {

        const sliderBtn = document.querySelector('.outer__box')
        const slider = document.querySelector('.inner__box');
        const body = document.querySelector('body');

        let darkModeEnabled = localStorage.getItem('theme') === "true";

        if (darkModeEnabled) {
            darkModeOn();
        } else {
            darkModeOff();
        }

        if (!slider) throw new Error ('slider not found!');
        if (!body) throw new Error ('body not found!');

        setTimeout(() => {
            body.classList.remove('preload');
        }, 50);

        sliderBtn.addEventListener('click', () => {
            if (!darkModeEnabled) {
                darkModeOn();
            } else {
                darkModeOff();
            }
        });

        function darkModeOn() {
            slider.classList.add('dark');
            body.classList.add('mode__dark');
            darkModeEnabled = true;

            localStorage.setItem('theme', 'true')
        }

        function darkModeOff() {
            slider.classList.remove('dark');
            body.classList.remove('mode__dark');
            darkModeEnabled = false;

            localStorage.setItem('theme', 'false');
        }; 
    
    } catch (error) {
        console.error('Error :', error.message);
        return false;
    }
}