
export function createCard(data) {

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
        return card;
    });
}