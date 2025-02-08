import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Paper,
    Box,
    Checkbox,
    TableFooter,
    TablePagination
} from "@mui/material";
import TablePaginationActions from "@/components/table-pagination-actions";


type CurrencyInfo = {
    currency: string;
    alphabeticCode: string;
};

type CountryCurrencyData = {
    [country: string]: CurrencyInfo[]; // Страна: массив валют
};


interface CountryCurrencyTableProps {
    groupedData: CountryCurrencyData | null;
    countries: boolean;
    sentSelectToApi: (newSelection: string[]) => void; // Функция для отправки выбранных стран/валют
    selected: string[];
    setSelected: React.Dispatch<React.SetStateAction<string[]>>; // Тип для setSelected, как сеттер состояния
}

const CountryCurrencyTable: React.FC<CountryCurrencyTableProps> = ({
                                                                       groupedData,
                                                                       countries,
                                                                       sentSelectToApi,
                                                                       selected,
                                                                       setSelected,
                                                                   }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const isItemSelected = (country: string) => selected.includes(country);

    const handleSelect = (country: string) => {
        setSelected((prev: string[]) => {
            const newSelection = isItemSelected(country)
                ? prev.filter((item) => item !== country)
                : [...prev, country];

            sentSelectToApi(newSelection); // Отправляем данные на бэкенд

            return newSelection;
        });
    };

    const labelId = (country: string) => `enhanced-table-checkbox-${country}`;

    if (!groupedData) {
        return <p>Данные загружаются...</p>;
    }

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const visibleRows = React.useMemo(
        () =>
            Object.entries(groupedData) // Преобразуем объект в массив
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [groupedData, page, rowsPerPage]
    );

    // const emptyRows =
    //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Object.keys(groupedData).length) : 0;

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell/>
                            <TableCell width="30%">{countries ? <b>Страна</b> : <b>Валюта</b>}</TableCell>
                            <TableCell>{countries ? <b>Коды валют</b> : <b>Страны</b>}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map(([country, currencies], index) => {
                            const isSelected = isItemSelected(country);
                            return (
                                <TableRow
                                    key={country}
                                    onClick={() => handleSelect(country)}
                                    sx={{
                                        backgroundColor: isSelected ? "#87cdf3" : (index % 2 === 1 ? "#d4effa" : "transparent"),
                                        transition: "background-color 0.2s ease-in-out",
                                        cursor: "pointer"
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
                                    <TableCell sx={{display: "flex", flexWrap: "wrap", gap: 1}}>
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
                                                    <Box>{item.currency}</Box>
                                                )}
                                            </Box>
                                        ))}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                colSpan={3}
                                count={Object.entries(groupedData).length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                slotProps={{
                                    select: {
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    },
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
};

export default CountryCurrencyTable;
