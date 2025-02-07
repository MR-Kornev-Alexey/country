import React from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Paper, Box, Checkbox
} from "@mui/material";

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
    const [selected, setSelected] = React.useState<string[]>([]);

    const isItemSelected = (country: string) => selected.includes(country);

    const handleSelect = (country: string) => {
        setSelected((prev) =>
            isItemSelected(country)
                ? prev.filter((item) => item !== country)
                : [...prev, country]
        );
    };

    const labelId = (country: string) => `enhanced-table-checkbox-${country}`;

    if (!groupedData) {
        return <p>Данные загружаются...</p>;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>{countries ? <b>Страна</b> : <b>Валюта</b>}</TableCell>
                        <TableCell>{countries ? <b>Коды валют</b> : <b>Страны</b>}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(groupedData).map(([country, currencies]) => {
                        const isSelected = isItemSelected(country);
                        return (
                            <TableRow
                                key={country}
                                sx={{
                                    backgroundColor: isSelected ? "#d4d9fc" : "inherit",
                                    borderBottom: "2px solid #141414"
                                }}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        checked={isSelected}
                                        onChange={() => handleSelect(country)}
                                        inputProps={{
                                            'aria-labelledby': labelId(country),
                                        }}
                                    />
                                </TableCell>
                                <TableCell>{country}</TableCell>
                                <TableCell sx={{ display: "flex", flexWrap: "wrap", gap: 1 }} >
                                    {currencies.map((item, index) => (
                                        <Box key={index}>
                                            {countries ? (
                                                <Tooltip title={item.currency} arrow>
                                                    <span
                                                        style={{
                                                            marginRight: 10,
                                                            cursor: "pointer",
                                                            textDecoration: "underline",
                                                        }}
                                                    >
                                                        {item.alphabeticCode}
                                                    </span>
                                                </Tooltip>
                                            ) : (
                                                <Box >{item.currency}</Box>
                                            )}
                                        </Box>
                                    ))}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CountryCurrencyTable;
