'use client'
import {Box, Button, Stack, Typography} from "@mui/material";
import React, {useEffect, useState, useCallback} from "react";
import {fetchCountriesData, handleSendSelect, handleSendToApiBackend} from "@/api/handle-send-to-api";
import CountryCurrencyTable from "@/components/table";
import rows_ru from "../data/output";

type Currency = {
    id?: number;
    currency: string;
    alphabeticCode: string;
    numericCode: string;
    entity: string;
    haveInUn: string;
};

type CountryCurrencyData = {
    [key: string]: Array<{
        currency: string;
        alphabeticCode: string;
    }>;
};


export default function MainScreen() {
    const [rows, setRows] = useState<CountryCurrencyData | null>(null);
    const [countries, setCountries] = useState<boolean>(true);
    const [selected, setSelected] = React.useState<string[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCountriesData(); // Получаем данные через API
                console.log(data);
                // Корректное обновление данных в зависимости от `frontend`
                setRows(countries ? groupByCountry(data[0]) : groupByCurrency(data[0]));

                if(data[1] !== null) {
                    setSelected(data[1]?.data)
                }

            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, [countries]);


    // Группировка data-данных по странам
    const groupByCountry = (data: Currency[]): CountryCurrencyData => {
        const grouped = data.reduce((acc: CountryCurrencyData, row: Currency): CountryCurrencyData => {
            if (row.haveInUn === "true") {
                const country = row.entity;
                if (!acc[country]) acc[country] = [];
                acc[country].push({
                    currency: row.currency,
                    alphabeticCode: row.alphabeticCode,
                });
            }
            return acc;
        }, {});

        // Сортируем ключи (страны) по алфавиту
        return Object.fromEntries(Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b))) as CountryCurrencyData;
    };

// Группировка data-данных по валютам
    const groupByCurrency = (data: Currency[]): CountryCurrencyData => {
        return data.reduce((acc: CountryCurrencyData, row: Currency): CountryCurrencyData => {
            if (row.haveInUn === "true") {
                const currency = `${row.currency} (${row.alphabeticCode})`;
                if (!acc[currency]) acc[currency] = [];
                acc[currency].push({
                    currency: row.entity, // Сохраняем страну вместо валюты
                    alphabeticCode: "",   // Код валюты здесь не нужен
                });
            }
            return acc;
        }, {});
    };

    const toggleStatus = useCallback(() => {
        setCountries((prev) => !prev);
    }, []);

    const firstDownload =  async () => {
        await handleSendToApiBackend(rows_ru)
    }
    const sentSelectToApi = async (selected: string[]) => {
        await handleSendSelect(selected)
    }

    return (
        <Stack>

            <Box sx={{marginY: 4, marginX: "auto"}}>
                <Typography variant="h3" sx={{textAlign: "center", textTransform: "uppercase"}}>
                    Страны и валюты
                </Typography>
            </Box>
            {rows && Object.keys(rows).length > 0 ? (
                <Stack>
                     <Stack direction="row" sx={{marginLeft: 2}}>
                        <Button sx={{width: 260, backgroundColor:"#87cdf3" , color:"#121a1e"}} size="medium" variant="contained" onClick={toggleStatus}>
                            <Typography>
                                {countries ? "Страна + Валюты" : "Валюта + Страны"}
                            </Typography>
                        </Button>
                    </Stack>
                    <Box>
                        <CountryCurrencyTable groupedData={rows} selected={selected} setSelected={setSelected} countries={countries} sentSelectToApi={sentSelectToApi}/>
                    </Box>
                </Stack>
            ) : (
                <Stack>
                    <Typography sx={{my:4}}>Загрузка...</Typography>
                    <Button sx={{width: 260, backgroundColor:"#87cdf3" , color:"#121a1e" }} size="medium" variant="contained" onClick={() => firstDownload()}>
                        <Typography>
                            Загрузить
                        </Typography>
                    </Button>
                </Stack>
            )}
        </Stack>
    );
}
