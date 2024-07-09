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

