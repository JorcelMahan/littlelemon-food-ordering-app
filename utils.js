export const roundTwoDecimals = (number) => {
    // always show two decimal places even when the second decimal place is 0
    return number.toFixed(2);
};