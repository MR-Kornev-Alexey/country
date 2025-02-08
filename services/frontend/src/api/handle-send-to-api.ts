import {CurrencyInfo} from "@/types/types";

const handleSendToApiBackend =  async (selected: CurrencyInfo[] | null) => {
    try {
        const response = await fetch("http://localhost:5000/countries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selected),
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Ответ от сервера:", data);
    } catch (error) {
        console.error("Ошибка при отправке данных:", error);
    }
};

export default handleSendToApiBackend;
