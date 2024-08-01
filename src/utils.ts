import {BookItem} from "./types.ts";

export function getSlug(name: string): string {
    name = name.toLowerCase();
    name = name.replace(/ /g, "-");
    name = name.replace(/"'"/, "");
    return name;
}

export const bookImagePrefix = `${import.meta.env.BASE_URL}/book-images/`;
export const categoryImagePrefix = `${import.meta.env.BASE_URL}/category-images/`;
export const siteImagePrefix = `${import.meta.env.BASE_URL}/site-images/`;
export const bookImageFilename = (book: BookItem) => `${bookImagePrefix}${getSlug(book.title)}.jpg`;

export const apiUrl =
    `${location.protocol}//${location.hostname}:` +
    `${location.port === '5173' ? '8080' : location.port}` +
    `${import.meta.env.BASE_URL}/api`

export const wineIcon = "fa-solid fa-wine-glass";
export const beerIcon = "fa-solid fa-beer";
export const teaIcon = "fa-solid fa-coffee";
export const coffeeIcon = "fa-solid fa-mug-hot";

export const icons: Record<string, string> = {
    'Wine': wineIcon,
    'Beer': beerIcon,
    'Tea': teaIcon,
    'Coffee': coffeeIcon
}

// From https://flaviocopes.com/how-to-format-number-as-currency-javascript/
const PriceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
});

export const asDollarsAndCents = function (cents: number) {
    return PriceFormatter.format(cents / 100.0);
};

export function months(): { value: number; label: string }[] {
    return [
        {value: 1, label: '(1) January'},
        {value: 2, label: '(2) February'},
        {value: 3, label: '(3) March'},
        {value: 4, label: '(4) April'},
        {value: 5, label: '(5) May'},
        {value: 6, label: '(6) June'},
        {value: 7, label: '(7) July'},
        {value: 8, label: '(8) August'},
        {value: 9, label: '(9) September'},
        {value: 10, label: '(10) October'},
        {value: 11, label: '(11) November'},
        {value: 12, label: '(12) December'}
    ]
}

export function years(): { value: number; label: string }[] {
    const currentYear = new Date().getFullYear();
    return Array.from({length: 16},
        (_, i) => {
            return {value: currentYear + i, label: `${currentYear + i}`}
        });
}

export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
};