'use client'

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import CountryCurrencyTable from "@/components/new-tables";
import React, { useEffect, useState, useCallback } from "react";

type CurrencyInfo = {
    currency: string;
    alphabeticCode: string;
};

type CountryCurrencyData = {
    [key: string]: CurrencyInfo[];
};

export default function Home() {
    const [rows, setRows] = useState<CountryCurrencyData | null>(null);
    const [countries, setCountries] = useState<boolean>(true);

    // Группировка JSON-данных по странам
    const groupByCountry = (data: any[]): CountryCurrencyData => {
        const grouped = data.reduce((acc: CountryCurrencyData, row) => {
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


    // Группировка JSON-данных по валютам
    const groupByCurrency = (data: any[]): CountryCurrencyData => {
        return data.reduce((acc: CountryCurrencyData, row) => {
            if (row.haveInUn === "true") {
                const currency = `${row.currency} (${row.alphabeticCode})`;
                if (!acc[currency]) acc[currency] = [];
                acc[currency].push({
                    currency: row.entity, // Здесь сохраняем страну вместо валюты
                    alphabeticCode: "",   // Код валюты здесь не нужен
                });
            }
            return acc;
        }, {});
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/countries");
                if (!response.ok) throw new Error("Ошибка загрузки JSON");
                const data = await response.json();

                // Корректное обновление данных в зависимости от `countries`
                setRows(countries ? groupByCountry(data) : groupByCurrency(data));
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
                setRows(null);
            }
        };
        fetchData();
    }, [countries]); // Добавлено в зависимости, чтобы обновлять данные при переключении

    const toggleStatus = useCallback(() => {
        setCountries((prev) => !prev);
    }, []);

    return (
        <Container>
            <Box sx={{ marginTop: 3, marginX: "auto" }}>
                <Typography variant="h3" sx={{ textAlign: "center", textTransform: "uppercase" }}>
                    Страны и валюты
                </Typography>
            </Box>

            {rows && Object.keys(rows).length > 0 ? (
                <Stack>
                    <Stack direction="row" sx={{ marginLeft: 2 }}>
                        <Button sx={{ width: 260 }} size="medium" variant="contained" onClick={toggleStatus}>
                            <Typography>
                                {countries ? "Страна + Валюты" : "Валюта + Страны"}
                            </Typography>
                        </Button>
                    </Stack>
                    <Box>
                        <CountryCurrencyTable groupedData={rows} countries={countries} />
                    </Box>
                </Stack>
            ) : (
                <Stack>
                    <Typography>Загрузка...</Typography>
                </Stack>
            )}
        </Container>
    );
}
