
export async function dataFetcher() {
    try {
        const response = await fetch('/CSS_Button_component_library/data/buttonsData.json');

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Loaded ${data.length} buttons`);

        return data;

    } catch (e) {
        console.error("Error :", e.message);
        return [];
    }
}