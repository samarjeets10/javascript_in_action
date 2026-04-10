
export async function featchbutton() {
    try {
        const response = await fetch('/CSS_Button_component_library/data/buttonsData.json');
        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.error("Fetch error:", error);
        return  [];
    }
}