
import { createCard } from "../components/ButtonCard";

export function renderButtons(buttons, container) {
    container.innerHTML = "";

    button.forEach(button => {
        const card = createCard(button);
        container.appendChild(card);
    });
}