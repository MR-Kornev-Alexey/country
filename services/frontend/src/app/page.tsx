'use client'
import {Box, Button, Container, Stack, Typography} from "@mui/material";
import EnhancedTable from "@/components/table";
import handleSendToApiBackend from "@/api/handle-send-to-api";
import * as React from "react";
import JSONRows from "@/JSON/output";
import { useEffect, useState } from "react";

export default function Home() {
    const [selected, setSelected] = useState<readonly number[]>([]);
    const [rows, setRows] = useState<any[]>([]);
    const [countries, setCountries] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/countries"); // Загружаем JSON с сервера
                if (!response.ok) throw new Error("Ошибка загрузки JSON");
                const data = await response.json();
                setRows(data.filter(row => row.haveInUn === true || row.haveInUn === "true"));
                groupByCountry(data)
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
                setRows([]); // Если ошибка — устанавливаем пустой массив
            }
        };
        fetchData();
    }, []);

    // Фильтруем только выбранные строки
    const showOnlySelected = () => {
        setRows(prevRows => prevRows.filter(row => selected.includes(row.id)));
    };

    const handleSendToApi = async (selectedIds: number[]) => {
        console.log(selectedIds);
        await handleSendToApiBackend(selectedIds);
    };

    const toggleStatus =()=>{
        setCountries(!countries);
    }
    const groupByCountry =(rows) => {
        const result = {};

        rows.forEach(row => {
            // Проверяем, что страна есть в списке стран
            if (row.haveInUn === "true") {
                const country = row.entity;
                const countryInfo = {
                    currency: row.currency,
                    alphabeticCode: row.alphabeticCode
                };

                // Если ключ (страна) уже существует, добавляем объект в массив
                if (result[country]) {
                    result[country].push(countryInfo);
                } else {
                    // Если ключа нет, создаем новый массив для страны
                    result[country] = [countryInfo];
                }
            }
        });
        console.log(result);
        return result;
    }
    return (
        <Container >
            <Box sx={{ marginTop: 3, marginX: "auto" }}>
                <Typography variant="h3" sx={{ textAlign: "center", textTransform: "uppercase" }}>
                    Страны и валюты
                </Typography>
            </Box>
            {rows.length > 0 ? <Stack>
                  <Stack direction="row" sx={{marginLeft: 2}}>
                    <Button sx={{ width: 160 }} size="medium" variant="contained" onClick={()=>toggleStatus()}>
                        {countries?<p>
                            страна+валюты
                        </p>:<p>
                            валюта+страны
                        </p>
                        }
                    </Button>
                </Stack>
                <Box>
                    <EnhancedTable handleSendToApi={handleSendToApi} rows={rows} countries={countries}/>
                </Box>
            </Stack>:<Stack>
                Загрузка ...
            </Stack>
            }
        </Container>
    );
}
