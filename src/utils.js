export const currencyFormatter = new Intl.NumberFormat("en-US", {    // We can use undefined instead of "en-US" to display 'US$' instead of '$'
    style: "currency",
    currency: "usd",
    minimumFractionDigits: 0,
})