export function formatMoney(number) {
    const parts = Number(number).toFixed(2).toString().split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return integerPart + '.' + parts[1];
};