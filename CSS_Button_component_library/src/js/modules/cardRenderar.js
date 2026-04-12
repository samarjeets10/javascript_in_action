
export async function cardRenderar(buttonsData, wrapper) {

    try {

        if(!buttonsData || buttonsData.length === 0) {
            throw new Error(`No Buttons Data found!`);
        }

        if (!wrapper) {
            throw new Error(`No container Wrapper found!!`);
        }

        wrapper.innerHTML = ``;

        buttonsData.forEach((button) => {
            const card = document.createElement('div');

            card.innerHTML = `
                                <div class="card" data-key="${button.id}">

                                <style>
                                    ${button.css}
                                </style>

                                <div class="preview__box" style="background-color:${button.background}">
                                    <div class="copy__code">
                                        <i class="ri-code-s-slash-line"></i>
                                        <p>get code</p>
                                    </div>
                                    ${button.html}
                                </div>

                                <div class="card__text__content">
                                    <div class="left__text">
                                        <h3>${button.title}</h3>
                                        <p>${button.description}</p>
                                    </div>
                                    <div class="right__cta" postId="${button.id}">
                                        <i class="fa fa-heart heart-fa"></i>
                                        <span class="count">0</span>
                                    </div>
                                </div>
                            </div>
                        `;

            wrapper.appendChild(card);
        })
    } catch (error) {
        console.log("Error :", error.message);
    }
}