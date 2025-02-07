import React from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Paper, Box} from "@mui/material";

// Определяем типы для валюты и объекта данных
type CurrencyInfo = {
    currency: string;
    alphabeticCode: string;
};

type CountryCurrencyData = {
    [country: string]: CurrencyInfo[];
};

// Определяем интерфейс пропсов
interface CountryCurrencyTableProps {
    groupedData: CountryCurrencyData | null;
    countries: boolean;
}

const CountryCurrencyTable: React.FC<CountryCurrencyTableProps> = ({ groupedData, countries }) => {
    if (!groupedData) {
        return <p>Данные загружаются...</p>;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{countries?<b>Страна</b>:<b>Валюта</b>}</TableCell>
                        <TableCell>{countries?<b>Коды валют</b>:<b>Страны</b>}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(groupedData).map(([country, currencies]) => (
                        <TableRow key={country}>
                            <TableCell>{country}</TableCell>
                            <TableCell>
                                {currencies.map((item, index) => (
                                    <Box key={index} >
                                        {  countries?<Tooltip key={index} title={item.currency} arrow>
                                        <span style={{ marginRight: 10, cursor: "pointer", textDecoration: "underline" }}>
                                            {item.alphabeticCode}
                                        </span>
                                            </Tooltip>:
                                            <Box>
                                                {item.currency}
                                        </Box>
                                        }
                                    </Box>
                                ))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CountryCurrencyTable;
