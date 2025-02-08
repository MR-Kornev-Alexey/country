import {CurrencyInfo} from "@/types/types";

export const handleSendToApiBackend =  async (selected: CurrencyInfo[] | null) => {
    try {
        const response = await fetch("http://localhost:5000/countries/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selected),
        });

        if (!response.ok) {
            console.log(`Ошибка: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Ответ от сервера:", data);
    } catch (error) {
        console.error("Ошибка при отправке данных:", error);
    }
};

type HandleSendSelectResponse = {
    data?: string[]
};

export const handleSendSelect = async (selectedCountries: string[]): Promise<void> => {
    const selectDto = {
        data: selectedCountries,
        id: null,
    };

    try {
        const response = await fetch('http://localhost:5000/countries/select', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Указываем, что отправляем data
            },
            body: JSON.stringify(selectDto), // Преобразуем объект в строку data
        });

        if (response.ok) {
            const result: HandleSendSelectResponse = await response.json();
            console.log('Данные успешно отправлены', result);
        } else {
            console.log('Ошибка при отправке данных');
        }
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
    }
};


export const fetchCountriesData = async () => {
    try {
        const response = await fetch("http://localhost:5000/countries");
        if (!response.ok) console.log("Ошибка загрузки data");
        return await response.json();
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        throw error;
    }
};
