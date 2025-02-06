const rawData = [
    { Entity: "ARMENIA", Currency: "Armenian Dram", AlphabeticCode: "AMD", NumericCode: "051", MinorUnit: 2, WithdrawalDate: "" },
    { Entity: "ARUBA", Currency: "Aruban Florin", AlphabeticCode: "AWG", NumericCode: 533, MinorUnit: 2, WithdrawalDate: "" },
    { Entity: "AUSTRALIA", Currency: "Australian Dollar", AlphabeticCode: "AUD", NumericCode: "036", MinorUnit: 2, WithdrawalDate: "" },
    { Entity: "AUSTRIA", Currency: "Euro", AlphabeticCode: "EUR", NumericCode: 978, MinorUnit: 2, WithdrawalDate: "" },
    { Entity: "AZERBAIJAN", Currency: "Azerbaijan Manat", AlphabeticCode: "AZN", NumericCode: 944, MinorUnit: 2, WithdrawalDate: "" },
];

const data = require("./data")

const transformedData = data.map((item, index) => ({
    id: index + 1,
    currency: item.Currency,
    alphabeticCode: item.AlphabeticCode,
    numericCode: String(item.NumericCode),
    entity: item.Entity,
}));

console.log(JSON.stringify(transformedData, null, 2));